"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { featuredProjects, site } from "@/lib/mock-data";

import { ArrowRightIcon, CodeIcon, GithubLogoIcon } from "@phosphor-icons/react";

export default function ProjectsPage () {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="text-primary grid size-10 place-items-center rounded-2xl bg-primary/10 ring-1 ring-border/60">
                        <CodeIcon />
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

                <div className="border-border/60 bg-background/30 flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <div className="text-sm font-medium">Search (mock)</div>
                        <div className="text-muted-foreground text-sm">
                            This is a static mock — the UI is here for future wiring.
                        </div>
                    </div>
                    <div className="w-full sm:max-w-sm">
                        <Input placeholder="Search by title, tag, year…" />
                    </div>
                </div>
            </section>

            <Separator className="border-border/60" />

            <section className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight">Featured</h2>
                        <div className="text-muted-foreground mt-1 text-sm">
                            The projects I would actually open in a conversation.
                        </div>
                    </div>
                    <Button asChild variant="outline" className="border-border/60 bg-background/40">
                        <a href={site.links.github} target="_blank" rel="noreferrer">
                            <GithubLogoIcon data-icon="inline-start" />
                            All repos
                            <ArrowRightIcon data-icon="inline-end" />
                        </a>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {featuredProjects.map((p) => (
                        <Card
                            key={p.slug}
                            className="border-border/60 bg-card/80 overflow-hidden"
                        >
                            <div className="relative h-36">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-background to-background" />
                                <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.14),rgba(255,255,255,0))]" />
                            </div>
                            <CardHeader>
                                <CardTitle className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                    <span className="mr-auto">{p.title}</span>
                                    <Badge variant="secondary">{p.year}</Badge>
                                </CardTitle>
                                <CardDescription>{p.summary}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {p.tags.map((t) => (
                                        <Badge key={t} variant="outline" className="border-border/60 bg-background/40">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="bg-muted/20 border-border/60">
                                <Button asChild variant="ghost" className="ml-auto">
                                    <Link href="/">
                                        {p.linkLabel}
                                        <ArrowRightIcon data-icon="inline-end" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>

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
