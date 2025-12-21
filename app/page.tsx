"use client";

import Link from "next/link";
import type { ReactNode } from "react";

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
import { Separator } from "@/components/ui/separator";
import { featuredProjects, paintings, rants, site, tracks } from "@/lib/mock-data";

import {
    ArrowRightIcon,
    CodeIcon,
    MusicNotesIcon,
    PaintBrushIcon,
    PlayIcon,
    QuotesIcon,
} from "@phosphor-icons/react";

export default function Page () {
    return (
        <div className="space-y-12">
            <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-muted/30 via-background to-background p-6 sm:p-10">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-24 left-1/2 h-[22rem] w-[38rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
                </div>

                <div className="relative">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="border-border/60 bg-background/40">
                            dark-mode portfolio
                        </Badge>
                        <Badge variant="outline" className="border-border/60 bg-background/40">
                            blog + audio + video
                        </Badge>
                        <Badge variant="outline" className="border-border/60 bg-background/40">
                            art archive
                        </Badge>
                    </div>

                    <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                        {site.tagline}
                    </h1>
                    <p className="text-muted-foreground mt-4 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg">
                        A mock front page: featured programming work, new tracks, recent paintings, and rants in
                        whatever format the day demands.
                    </p>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Button asChild size="lg">
                            <Link href="/projects">
                                <CodeIcon data-icon="inline-start" />
                                Explore Projects
                                <ArrowRightIcon data-icon="inline-end" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-border/60 bg-background/40">
                            <Link href="/rants">
                                <QuotesIcon data-icon="inline-start" />
                                Latest Rants
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <MiniStat label="Featured projects" value={`${featuredProjects.length}`} />
                        <MiniStat label="Tracks in rotation" value={`${tracks.length}`} />
                        <MiniStat label="Paintings archived" value={`${paintings.length}`} />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <SectionHeading
                    icon={<CodeIcon />}
                    title="Featured Projects"
                    description="A few builds worth lingering on."
                    href="/projects"
                />

                <div className="grid gap-4 md:grid-cols-3">
                    {featuredProjects.map((p) => (
                        <Card
                            key={p.slug}
                            className="border-border/60 bg-card/80 transition-transform will-change-transform hover:-translate-y-0.5"
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between gap-3">
                                    <span className="truncate">{p.title}</span>
                                    <Badge variant="secondary" className="shrink-0">
                                        {p.year}
                                    </Badge>
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
                                    <Link href={`/projects/${p.slug}`}>
                                        {p.linkLabel}
                                        <ArrowRightIcon data-icon="inline-end" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>

            <Separator className="border-border/60" />

            <section className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                    <SectionHeading
                        icon={<MusicNotesIcon />}
                        title="Music"
                        description="Recent tracks, sketches, and loop experiments."
                        href="/music"
                    />

                    <Card className="border-border/60 bg-card/70">
                        <CardHeader>
                            <CardTitle>Now playing</CardTitle>
                            <CardDescription>Mock playlist preview.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                                {tracks.slice(0, 3).map((t) => (
                                    <div
                                        key={t.id}
                                        className="hover:bg-muted/40 group flex items-center gap-3 rounded-xl border border-border/60 bg-background/30 p-3 transition-colors"
                                    >
                                        <div className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-border/60">
                                            <PlayIcon className="size-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="truncate text-sm font-medium">{t.title}</div>
                                            <div className="text-muted-foreground truncate text-xs">
                                                {t.mood} · {t.year}
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="border-border/60 bg-background/40">
                                            {t.duration}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/20 border-border/60">
                            <Button asChild variant="outline" className="border-border/60 bg-background/40 ml-auto">
                                <Link href="/music">
                                    Open library
                                    <ArrowRightIcon data-icon="inline-end" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="space-y-4">
                    <SectionHeading
                        icon={<PaintBrushIcon />}
                        title="Paintings"
                        description="Study log and gallery wall."
                        href="/paintings"
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        {paintings.slice(0, 4).map((p) => (
                            <Card
                                key={p.id}
                                className="border-border/60 bg-card/70 overflow-hidden"
                            >
                                <div className="relative aspect-[4/3] w-full">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-background to-background" />
                                    <div className="absolute inset-0 opacity-70 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),rgba(255,255,255,0))]" />
                                    <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.05),transparent)]" />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-sm">{p.title}</CardTitle>
                                    <CardDescription>
                                        {p.medium} · {p.size} · {p.year}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>

                    <Card className="border-border/60 bg-card/70">
                        <CardContent className="pt-4">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <div className="text-sm font-medium">Gallery mode</div>
                                    <div className="text-muted-foreground text-sm">
                                        Grid, metadata, and a place for process notes.
                                    </div>
                                </div>
                                <Button asChild variant="outline" className="border-border/60 bg-background/40">
                                    <Link href="/paintings">
                                        View paintings
                                        <ArrowRightIcon data-icon="inline-end" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Separator className="border-border/60" />

            <section className="space-y-4">
                <SectionHeading
                    icon={<QuotesIcon />}
                    title="Rants"
                    description="Text, audio, video — whatever carries the point."
                    href="/rants"
                />

                <div className="grid gap-4 md:grid-cols-3">
                    {rants.slice(0, 3).map((r) => (
                        <Card key={r.id} className="border-border/60 bg-card/70">
                            <CardHeader>
                                <CardTitle className="text-base">{r.title}</CardTitle>
                                <CardDescription>
                                    {r.kind.toUpperCase()} · {r.date}
                                    {r.duration ? ` · ${r.duration}` : ""}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {r.excerpt}
                                </p>
                            </CardContent>
                            <CardFooter className="bg-muted/20 border-border/60">
                                <Button asChild variant="ghost" className="ml-auto">
                                    <Link href={`/rants/${r.slug}`}>
                                        Open
                                        <ArrowRightIcon data-icon="inline-end" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}

function SectionHeading ({
    icon,
    title,
    description,
    href,
}: {
    icon: ReactNode;
    title: string;
    description: string;
    href: string;
}) {
    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <div className="flex items-center gap-2">
                    <div className="text-primary grid size-9 place-items-center rounded-xl bg-primary/10 ring-1 ring-border/60">
                        {icon}
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                </div>
                <div className="text-muted-foreground mt-2 text-sm">{description}</div>
            </div>
            <Button asChild variant="outline" className="border-border/60 bg-background/40">
                <Link href={href}>
                    View all
                    <ArrowRightIcon data-icon="inline-end" />
                </Link>
            </Button>
        </div>
    );
}

function MiniStat ({ label, value }: { label: string; value: string; }) {
    return (
        <div className="border-border/60 bg-background/30 flex items-center justify-between rounded-2xl border px-4 py-3">
            <div className="text-muted-foreground text-sm">{label}</div>
            <div className="text-sm font-semibold tabular-nums">{value}</div>
        </div>
    );
}