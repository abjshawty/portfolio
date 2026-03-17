import { RantsBrowser } from "@/components/rants-browser";
import { Separator } from "@/components/ui/separator";
import { getAllRants } from "@/lib/content";

export default async function RantsPage () {
    const rants = await getAllRants();

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="text-primary grid size-10 place-items-center rounded-2xl bg-primary/10 ring-1 ring-border/60">
                        <span className="text-sm font-semibold">R</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Rants</h1>
                        <div className="text-muted-foreground text-sm">
                            Text, audio, video — choose your preferred intensity.
                        </div>
                    </div>
                </div>
            </section>

            <Separator className="border-border/60" />

            <RantsBrowser
                rants={rants.map((r) => ({
                    slug: r.slug,
                    title: r.frontmatter.title,
                    excerpt: r.frontmatter.excerpt,
                    date: r.frontmatter.date,
                    kind: r.frontmatter.kind,
                    duration: r.frontmatter.duration,
                    tags: r.frontmatter.tags,
                }))}
            />

            <section className="border-border/60 bg-muted/10 rounded-3xl border p-6">
                <div className="text-sm font-medium">Next step</div>
                <div className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    Add a real post format with slugs, markdown, and media uploads.
                </div>
            </section>
        </div>
    );
}
