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
};

export type ContentEntry<TFrontmatter> = {
    slug: string;
    frontmatter: TFrontmatter;
    content: string;
};

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

    return {
        slug,
        frontmatter: parsed.data as TFrontmatter,
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
