"use client";

import * as React from "react";
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

import { ArrowRightIcon } from "@phosphor-icons/react";

export type ProjectListItem = {
    slug: string;
    title: string;
    summary: string;
    year?: string;
    tags?: string[];
};

function normalize (value: string) {
    return value.trim().toLowerCase();
}

export function ProjectsBrowser ({ projects }: { projects: ProjectListItem[]; }) {
    const [query, setQuery] = React.useState("");
    const [activeTag, setActiveTag] = React.useState<string | null>(null);

    const allTags = React.useMemo(() => {
        const set = new Set<string>();
        for (const p of projects) {
            for (const t of p.tags ?? []) set.add(t);
        }
        return Array.from(set).sort((a, b) => a.localeCompare(b));
    }, [projects]);

    const filtered = React.useMemo(() => {
        const q = normalize(query);
        return projects.filter((p) => {
            const tags = p.tags ?? [];
            if (activeTag && !tags.includes(activeTag)) return false;
            if (!q) return true;

            const haystack = normalize(
                [p.title, p.summary, p.year ?? "", ...tags].filter(Boolean).join(" ")
            );
            return haystack.includes(q);
        });
    }, [projects, query, activeTag]);

    return (
        <div className="space-y-4">
            <div className="border-border/60 bg-background/30 flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="text-sm font-medium">Search</div>
                    <div className="text-muted-foreground text-sm">
                        Filter by title, tag, or year.
                    </div>
                </div>
                <div className="w-full sm:max-w-sm">
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by title, tag, year…"
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setActiveTag(null)}>
                    <Badge
                        variant={activeTag === null ? "secondary" : "outline"}
                        className={activeTag === null ? "" : "border-border/60 bg-background/40"}
                    >
                        All
                    </Badge>
                </button>
                {allTags.map((t) => (
                    <button key={t} type="button" onClick={() => setActiveTag((cur) => (cur === t ? null : t))}>
                        <Badge
                            variant={activeTag === t ? "secondary" : "outline"}
                            className={activeTag === t ? "" : "border-border/60 bg-background/40"}
                        >
                            {t}
                        </Badge>
                    </button>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {filtered.map((p) => (
                    <Card key={p.slug} className="border-border/60 bg-card/80 overflow-hidden">
                        <div className="relative h-36">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-background to-background" />
                            <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.14),rgba(255,255,255,0))]" />
                        </div>
                        <CardHeader>
                            <CardTitle className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <span className="mr-auto">{p.title}</span>
                                {p.year ? <Badge variant="secondary">{p.year}</Badge> : null}
                            </CardTitle>
                            <CardDescription>{p.summary}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {p.tags?.length ? (
                                <div className="flex flex-wrap gap-2">
                                    {p.tags.map((t) => (
                                        <Badge key={t} variant="outline" className="border-border/60 bg-background/40">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>
                            ) : null}
                        </CardContent>
                        <CardFooter className="bg-muted/20 border-border/60">
                            <Button asChild variant="ghost" className="ml-auto">
                                <Link href={`/projects/${p.slug}`}>
                                    Open
                                    <ArrowRightIcon data-icon="inline-end" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="text-muted-foreground text-sm">No projects match your filters.</div>
            ) : null}
        </div>
    );
}
