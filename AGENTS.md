# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development commands

This is a Next.js App Router project using TypeScript, Tailwind CSS (via `@tailwindcss/postcss`), and shadcn/ui-style components.

- Install dependencies (recommended):
  - `bun install`
  - or: `npm install`
- Run the dev server:
  - `bun run dev`
  - or: `npm run dev`
- Build for production:
  - `bun run build`
  - or: `npm run build`
- Start the production server (after build):
  - `bun run start`
  - or: `npm run start`
- Lint the project:
  - `bun run lint`
  - or: `npm run lint`

### Tests

There is currently **no test runner or `test` script** configured in `package.json`. If you need tests, coordinate with the user before adding Jest, Vitest, or Playwright and then document the resulting commands here (including how to run a single test).

## High-level architecture

### App Router structure

- `app/layout.tsx`
  - Root layout for the App Router.
  - Applies global fonts (`Geist`, `Geist_Mono`, `Outfit`) and wraps all pages in `ThemeProvider` and `SiteShell`.
  - Sets global `metadata` (title/description for "Timmy's Devlog").
- `app/page.tsx`
  - Home page, marked `"use client"`.
  - Displays featured projects, tracks, paintings, and rants using data from `lib/mock-data` and composable UI primitives (`Card`, `Badge`, `Button`, etc.).
- Section routes (mostly marketing/UX pages):
  - `app/projects/page.tsx` – server component that calls `getAllProjects()` from `lib/content` and renders an interactive `ProjectsBrowser` client component.
  - `app/projects/[slug]/page.tsx` – server component for individual project detail pages.
    - Uses `getAllProjects`/`getProjectBySlug` from `lib/content`.
    - Uses `next-mdx-remote` with `components/mdx-components` to render MDX content.
    - Implements `generateStaticParams` and `generateMetadata` based on content frontmatter.
  - `app/rants/page.tsx` – server component that calls `getAllRants()` from `lib/content` and renders `RantsBrowser`.
  - `app/rants/[slug]/page.tsx` – server MDX detail page for individual rants (same pattern as projects detail).
  - `app/music/page.tsx` – client component that renders mock track listings and an `<audio>` player using data from `lib/mock-data`.
  - `app/paintings/page.tsx` – client component that renders painting cards using `lib/mock-data`.
  - `app/admin/page.tsx` – trivial server component that redirects to `/admin/index.html` (static admin shell in `public` if present).
- API routes:
  - `app/api/search-index/route.ts`
    - Server route used by the command palette.
    - Aggregates `getAllProjects()` and `getAllRants()` and returns a JSON search index grouped into `pages`, `projects`, and `rants`.

### Content model (`content/` + `lib/content.ts`)

- MDX-backed content lives under `content/` (not TypeScript files):
  - `content/projects/*.mdx` – project entries.
  - `content/rants/*.mdx` – rant entries.
- `lib/content.ts` encapsulates all file-system content loading and frontmatter validation:
  - Uses `node:fs/promises`, `node:path`, and `gray-matter`.
  - `contentDir(...parts)` builds paths relative to `process.cwd()/content`.
  - Strongly typed frontmatter:
    - `ProjectFrontmatter` with `title`, `summary`, optional `year`, `tags`.
    - `RantFrontmatter` with `title`, `excerpt`, `date`, `kind` (`"text" | "audio" | "video"`), optional `duration`, `tags`.
  - Validation helpers (`assertString`, `assertOptionalString`, `assertOptionalStringArray`, `coerceString`) throw descriptive errors if frontmatter is missing or malformed.
  - Public API surface:
    - `getAllProjects()` / `getProjectBySlug(slug)` – list and fetch projects, sorted by `year` descending.
    - `getAllRants()` / `getRantBySlug(slug)` – list and fetch rants, sorted by `date` descending.

### Mock data and site metadata (`lib/mock-data.ts`)

- Defines light-weight, in-memory mock content used primarily on the home page and simple listing pages:
  - `site` – global metadata (name, tagline, location, external links).
  - `featuredProjects`, `tracks`, `paintings`, `rants` – arrays used for cards and stats.
- Use these when you need quick, non-persistent data for layout/UX exploration.
- For anything that should be stored as real content, prefer MDX via `lib/content.ts` instead.

### Layout and theming

- `components/site-shell.tsx`
  - Global visual frame: background gradients, page max-width, and shared header/footer.
- `components/site-header.tsx`
  - Client header with navigation, theme toggle, command palette launcher, and external links.
  - Integrates `next-themes` for dark/light/system theme and exposes theme state to the rest of the app.
- `components/site-footer.tsx`
  - Footer that reuses `site` metadata and exposes navigation links and external profiles.
- `components/theme-provider.tsx`
  - Thin wrapper around `next-themes` `ThemeProvider` used in `app/layout.tsx`.

### Command palette and search

- `components/command-palette.tsx`
  - Client-side command palette based on `Dialog` + `Command` primitives from `components/ui`.
  - Hotkey support: listens for `Ctrl+K` (or `⌘K`) via a custom `useHotkeys` hook.
  - Lazily fetches search index from `/api/search-index` and caches it (`cachedIndex`, `cachedIndexPromise`).
  - Normalizes search results into grouped lists and navigates with `useRouter().push()`.

### UI component system (`components/ui` + `lib/utils.ts`)

- `lib/utils.ts` exposes a single `cn` helper that composes Tailwind class strings via `clsx` + `tailwind-merge`.
- `components/ui/*` contains reusable, design-system-style components (button, card, dialog, dropdown, input, etc.), largely patterned after shadcn/ui:
  - Each UI component:
    - Accepts standard React props plus variant/size props where relevant (via `class-variance-authority`).
    - Uses `cn` to merge Tailwind utility classes.
    - Often exposes subcomponents (e.g. `CardHeader`, `CardContent`, `CardFooter`).
- When building new features, prefer reusing these primitives instead of ad-hoc markup.

### MDX rendering (`components/mdx-components.tsx`)

- Provides a custom MDX component mapping for MDX content rendered on project and rant detail pages.
- Overrides tags like `a`, `h1`–`h3`, `p`, `ul`, `ol`, `li`, `blockquote`, `code`, `pre`, `hr` to match the site’s typography and theming.
- Exposes MDX-specific components (`Audio`, `Video`, `YouTube`) that encapsulate common media patterns.
- Used via `MDXRemote` in `app/projects/[slug]/page.tsx` and `app/rants/[slug]/page.tsx`.

### Configuration

- `next.config.ts`
  - Currently minimal, exporting a default `NextConfig` object; extend this if you add redirects, rewrites, image domains, etc.
- `tsconfig.json`
  - Strict TypeScript configuration with a `@/*` path alias mapped to the repo root (e.g. `@/components/...`, `@/lib/...`).
- `eslint.config.mjs`
  - Uses `eslint-config-next` (`core-web-vitals` and `typescript` presets).
  - Overrides default ignores using `globalIgnores` to explicitly ignore `.next/**`, `out/**`, `build/**`, and `next-env.d.ts`.
- `postcss.config.mjs`
  - Delegates to `@tailwindcss/postcss` for Tailwind CSS processing.

## Notes for future agents

- Favor server components for pages that only read from `lib/content`/`content/` and don’t need interactivity; use client components (with `"use client"`) only where stateful UI, effects, or browser APIs are required.
- When adding new content-backed sections, mirror the existing pattern:
  - MDX files under `content/<section>` with validated frontmatter.
  - Typed helpers in `lib/content.ts` (or a sibling module) and route files in `app/<section>/[slug]/page.tsx` using `MDXRemote` and `mdxComponents` where appropriate.
