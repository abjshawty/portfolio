import { getAllProjects, getAllRants } from "@/lib/content";

export async function GET () {
    const [projects, rants] = await Promise.all([getAllProjects(), getAllRants()]);

    return Response.json({
        pages: [
            { title: "Home", href: "/", group: "Pages" },
            { title: "Projects", href: "/projects", group: "Pages" },
            { title: "Music", href: "/music", group: "Pages" },
            { title: "Paintings", href: "/paintings", group: "Pages" },
            { title: "Rants", href: "/rants", group: "Pages" },
        ],
        projects: projects.map((p) => ({
            title: p.frontmatter.title,
            href: `/projects/${p.slug}`,
            subtitle: p.frontmatter.summary,
            group: "Projects",
        })),
        rants: rants.map((r) => ({
            title: r.frontmatter.title,
            href: `/rants/${r.slug}`,
            subtitle: r.frontmatter.excerpt,
            group: "Rants",
        })),
    });
}
