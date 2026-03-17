import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mdxComponents } from "@/components/mdx-components";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

export async function generateStaticParams () {
    const projects = await getAllProjects();
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata ({ params }: { params: Promise<{ slug: string; }>; }) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    return {
        title: `${project.frontmatter.title} · Projects`,
        description: project.frontmatter.summary,
    };
}

export default async function ProjectDetailPage ({
    params,
}: {
    params: Promise<{ slug: string; }>;
}) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between gap-3">
                <Button asChild variant="outline" className="border-border/60 bg-background/40">
                    <Link href="/projects">Back to projects</Link>
                </Button>
                {project.frontmatter.year ? (
                    <Badge variant="secondary">{project.frontmatter.year}</Badge>
                ) : null}
            </div>

            <Card className="border-border/60 bg-card/70">
                <CardHeader>
                    <CardTitle className="text-2xl">{project.frontmatter.title}</CardTitle>
                    <CardDescription>{project.frontmatter.summary}</CardDescription>
                    {project.frontmatter.tags?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {project.frontmatter.tags.map((t) => (
                                <Badge key={t} variant="outline" className="border-border/60 bg-background/40">
                                    {t}
                                </Badge>
                            ))}
                        </div>
                    ) : null}
                </CardHeader>
                <CardContent>
                    <Separator className="border-border/60 my-6" />
                    <article className="prose prose-invert max-w-none">
                        <MDXRemote source={project.content} components={mdxComponents} />
                    </article>
                </CardContent>
            </Card>
        </div>
    );
}
