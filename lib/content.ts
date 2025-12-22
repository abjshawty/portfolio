import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type ProjectFrontmatter = {
    title: string;
    summary: string;
    year?: string;
    tags?: string[];
};

export type RantFrontmatter = {
    title: string;
    excerpt: string;
    date: string;
    kind: "text" | "audio" | "video";
    duration?: string;
    tags?: string[];
};

export type ContentEntry<TFrontmatter> = {
    slug: string;
    frontmatter: TFrontmatter;
    content: string;
};

function assertString (value: unknown, field: string, filePath: string): asserts value is string {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error(`[content] Invalid or missing '${field}' in ${filePath}`);
    }
}

function assertOptionalString (value: unknown, field: string, filePath: string) {
    if (value === undefined) return;
    if (typeof value !== "string") {
        throw new Error(`[content] Invalid '${field}' (expected string) in ${filePath}`);
    }
}

function assertOptionalStringArray (value: unknown, field: string, filePath: string) {
    if (value === undefined) return;
    if (!Array.isArray(value) || value.some((v) => typeof v !== "string")) {
        throw new Error(`[content] Invalid '${field}' (expected string[]) in ${filePath}`);
    }
}

function validateProjectFrontmatter (data: Record<string, unknown>, filePath: string): ProjectFrontmatter {
    assertString(data.title, "title", filePath);
    assertString(data.summary, "summary", filePath);
    assertOptionalString(data.year, "year", filePath);
    assertOptionalStringArray(data.tags, "tags", filePath);

    return data as unknown as ProjectFrontmatter;
}

function validateRantFrontmatter (data: Record<string, unknown>, filePath: string): RantFrontmatter {
    assertString(data.title, "title", filePath);
    assertString(data.excerpt, "excerpt", filePath);
    assertString(data.date, "date", filePath);

    const kind = data.kind;
    if (kind !== "text" && kind !== "audio" && kind !== "video") {
        throw new Error(`[content] Invalid or missing 'kind' in ${filePath}`);
    }

    assertOptionalString(data.duration, "duration", filePath);
    assertOptionalStringArray(data.tags, "tags", filePath);

    return data as unknown as RantFrontmatter;
}

function contentDir (...parts: string[]) {
    return path.join(process.cwd(), "content", ...parts);
}

async function readEntry<TFrontmatter> (
    folder: "projects" | "rants",
    slug: string
): Promise<ContentEntry<TFrontmatter>> {
    const filePath = contentDir(folder, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);

    const data = parsed.data as Record<string, unknown>;
    const frontmatter =
        folder === "projects"
            ? validateProjectFrontmatter(data, filePath)
            : validateRantFrontmatter(data, filePath);

    return {
        slug,
        frontmatter: frontmatter as TFrontmatter,
        content: parsed.content,
    };
}

async function listSlugs (folder: "projects" | "rants") {
    const dir = contentDir(folder);
    const files = await fs.readdir(dir);
    return files
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getAllProjects () {
    const slugs = await listSlugs("projects");
    const entries = await Promise.all(
        slugs.map((slug) => readEntry<ProjectFrontmatter>("projects", slug))
    );

    return entries.sort((a, b) => (b.frontmatter.year ?? "").localeCompare(a.frontmatter.year ?? ""));
}

export async function getProjectBySlug (slug: string) {
    return readEntry<ProjectFrontmatter>("projects", slug);
}

export async function getAllRants () {
    const slugs = await listSlugs("rants");
    const entries = await Promise.all(
        slugs.map((slug) => readEntry<RantFrontmatter>("rants", slug))
    );

    return entries.sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export async function getRantBySlug (slug: string) {
    return readEntry<RantFrontmatter>("rants", slug);
}
