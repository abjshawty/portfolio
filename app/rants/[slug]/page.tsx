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
import { getAllRants, getRantBySlug } from "@/lib/content";

export async function generateStaticParams () {
    const rants = await getAllRants();
    return rants.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata ({ params }: { params: Promise<{ slug: string; }>; }) {
    const { slug } = await params;
    const rant = await getRantBySlug(slug);
    return {
        title: `${rant.frontmatter.title} · Rants`,
        description: rant.frontmatter.excerpt,
    };
}

export default async function RantDetailPage ({
    params,
}: {
    params: Promise<{ slug: string; }>;
}) {
    const { slug } = await params;
    const rant = await getRantBySlug(slug);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between gap-3">
                <Button asChild variant="outline" className="border-border/60 bg-background/40">
                    <Link href="/rants">Back to rants</Link>
                </Button>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-border/60 bg-background/40">
                        {rant.frontmatter.kind.toUpperCase()}
                    </Badge>
                    <Badge variant="secondary">{rant.frontmatter.date}</Badge>
                    {rant.frontmatter.duration ? (
                        <Badge variant="outline" className="border-border/60 bg-background/40">
                            {rant.frontmatter.duration}
                        </Badge>
                    ) : null}
                </div>
            </div>

            <Card className="border-border/60 bg-card/70">
                <CardHeader>
                    <CardTitle className="text-2xl">{rant.frontmatter.title}</CardTitle>
                    <CardDescription>{rant.frontmatter.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Separator className="border-border/60 my-6" />
                    <article className="prose prose-invert max-w-none">
                        <MDXRemote source={rant.content} components={mdxComponents} />
                    </article>
                </CardContent>
            </Card>
        </div>
    );
}
