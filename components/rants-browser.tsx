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

import {
    ArrowRightIcon,
    MicrophoneStageIcon,
    QuotesIcon,
    VideoCameraIcon,
} from "@phosphor-icons/react";

export type RantListItem = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    kind: "text" | "audio" | "video";
    duration?: string;
    tags?: string[];
};

function normalize (value: string) {
    return value.trim().toLowerCase();
}

export function RantsBrowser ({ rants }: { rants: RantListItem[]; }) {
    const [query, setQuery] = React.useState("");
    const [activeTag, setActiveTag] = React.useState<string | null>(null);
    const [kind, setKind] = React.useState<"all" | RantListItem["kind"]>("all");

    const allTags = React.useMemo(() => {
        const set = new Set<string>();
        for (const r of rants) {
            for (const t of r.tags ?? []) set.add(t);
        }
        return Array.from(set).sort((a, b) => a.localeCompare(b));
    }, [rants]);

    const filtered = React.useMemo(() => {
        const q = normalize(query);
        return rants.filter((r) => {
            const tags = r.tags ?? [];
            if (kind !== "all" && r.kind !== kind) return false;
            if (activeTag && !tags.includes(activeTag)) return false;
            if (!q) return true;

            const haystack = normalize(
                [r.title, r.excerpt, r.date, r.kind, ...tags].filter(Boolean).join(" ")
            );
            return haystack.includes(q);
        });
    }, [rants, query, activeTag, kind]);

    return (
        <div className="space-y-4">
            <div className="border-border/60 bg-background/30 flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="text-sm font-medium">Search</div>
                    <div className="text-muted-foreground text-sm">
                        Filter by title, tags, kind, or date.
                    </div>
                </div>
                <div className="w-full sm:max-w-sm">
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search rants…"
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setKind("all")}
                >
                    <Badge
                        variant={kind === "all" ? "secondary" : "outline"}
                        className={kind === "all" ? "" : "border-border/60 bg-background/40"}
                    >
                        all
                    </Badge>
                </button>
                <button type="button" onClick={() => setKind("text")}
                >
                    <Badge
                        variant={kind === "text" ? "secondary" : "outline"}
                        className={kind === "text" ? "" : "border-border/60 bg-background/40"}
                    >
                        text
                    </Badge>
                </button>
                <button type="button" onClick={() => setKind("audio")}
                >
                    <Badge
                        variant={kind === "audio" ? "secondary" : "outline"}
                        className={kind === "audio" ? "" : "border-border/60 bg-background/40"}
                    >
                        audio
                    </Badge>
                </button>
                <button type="button" onClick={() => setKind("video")}
                >
                    <Badge
                        variant={kind === "video" ? "secondary" : "outline"}
                        className={kind === "video" ? "" : "border-border/60 bg-background/40"}
                    >
                        video
                    </Badge>
                </button>
            </div>

            {allTags.length ? (
                <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => setActiveTag(null)}>
                        <Badge
                            variant={activeTag === null ? "secondary" : "outline"}
                            className={activeTag === null ? "" : "border-border/60 bg-background/40"}
                        >
                            All tags
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
            ) : null}

            <div className="grid gap-4 lg:grid-cols-3">
                {filtered.map((r) => (
                    <Card key={r.slug} className="border-border/60 bg-card/70 lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="text-base">{r.title}</CardTitle>
                            <CardDescription>
                                {r.date} · {r.kind.toUpperCase()}
                                {r.duration ? ` · ${r.duration}` : ""}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <div className="text-primary grid size-9 place-items-center rounded-xl bg-primary/10 ring-1 ring-border/60">
                                    {r.kind === "text" ? (
                                        <QuotesIcon className="size-4" />
                                    ) : r.kind === "audio" ? (
                                        <MicrophoneStageIcon className="size-4" />
                                    ) : (
                                        <VideoCameraIcon className="size-4" />
                                    )}
                                </div>
                                <div className="text-muted-foreground text-sm">{r.excerpt}</div>
                            </div>

                            {r.tags?.length ? (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {r.tags.map((t) => (
                                        <Badge key={t} variant="outline" className="border-border/60 bg-background/40">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>
                            ) : null}
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

            {filtered.length === 0 ? (
                <div className="text-muted-foreground text-sm">No rants match your filters.</div>
            ) : null}
        </div>
    );
}
