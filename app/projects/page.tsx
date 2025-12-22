import { ProjectsBrowser } from "@/components/projects-browser";
import { Separator } from "@/components/ui/separator";
import { getAllProjects } from "@/lib/content";

export default async function ProjectsPage () {
    const projects = await getAllProjects();

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="text-primary grid size-10 place-items-center rounded-2xl bg-primary/10 ring-1 ring-border/60">
                        <span className="text-sm font-semibold">P</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Projects
                        </h1>
                        <div className="text-muted-foreground text-sm">
                            Programming work, experiments, and the occasional obsession.
                        </div>
                    </div>
                </div>
            </section>

            <Separator className="border-border/60" />

            <ProjectsBrowser
                projects={projects.map((p) => ({
                    slug: p.slug,
                    title: p.frontmatter.title,
                    summary: p.frontmatter.summary,
                    year: p.frontmatter.year,
                    tags: p.frontmatter.tags,
                }))}
            />

            <section className="border-border/60 bg-muted/10 rounded-3xl border p-6">
                <div className="text-sm font-medium">What’s next</div>
                <div className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    Filters, project detail pages, and a write-up format that can handle code, screenshots,
                    and unhinged decision logs.
                </div>
            </section>
        </div>
    );
}
