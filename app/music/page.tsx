"use client";

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
import { site, tracks } from "@/lib/mock-data";

import {
    ArrowRightIcon,
    MusicNotesIcon,
    PlayIcon,
    SoundcloudLogoIcon,
} from "@phosphor-icons/react";

export default function MusicPage () {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="text-primary grid size-10 place-items-center rounded-2xl bg-primary/10 ring-1 ring-border/60">
                        <MusicNotesIcon />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Music</h1>
                        <div className="text-muted-foreground text-sm">
                            Tracks, sketches, loops, and whatever survived the export.
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="border-border/60 bg-card/70 lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Playlist</CardTitle>
                            <CardDescription>Static mock list (click targets are visual-only).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                                {tracks.map((t) => (
                                    <div
                                        key={t.id}
                                        className="hover:bg-muted/40 flex items-center gap-3 rounded-xl border border-border/60 bg-background/30 p-3 transition-colors"
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
                            <div className="text-muted-foreground text-sm">More coming soon: stems, notes, and presets.</div>
                            <Button asChild variant="outline" className="border-border/60 bg-background/40 ml-auto">
                                <a href={site.links.soundcloud} target="_blank" rel="noreferrer">
                                    <SoundcloudLogoIcon data-icon="inline-start" />
                                    SoundCloud
                                    <ArrowRightIcon data-icon="inline-end" />
                                </a>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-border/60 bg-card/70">
                        <CardHeader>
                            <CardTitle>Player</CardTitle>
                            <CardDescription>Preview UI for embedding audio.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-2xl border border-border/60 bg-background/30 p-4">
                                <div className="text-sm font-medium">Low Orbit</div>
                                <div className="text-muted-foreground mt-1 text-sm">Demo audio element</div>
                                <div className="mt-3">
                                    <audio
                                        controls
                                        className="w-full"
                                        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/20 border-border/60">
                            <Button variant="ghost" className="ml-auto">
                                Save to favorites
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>

            <Separator className="border-border/60" />

            <section className="grid gap-4 sm:grid-cols-2">
                <Card className="border-border/60 bg-card/70">
                    <CardHeader>
                        <CardTitle>Notes</CardTitle>
                        <CardDescription>Where I keep the why, not just the WAV.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-muted-foreground text-sm leading-relaxed">
                            Tempo maps, patch chains, and the extremely important question of whether the bass is
                            "too honest".
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/60 bg-card/70">
                    <CardHeader>
                        <CardTitle>Releases</CardTitle>
                        <CardDescription>When the mock becomes real.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="border-border/60 bg-background/40">EP</Badge>
                            <Badge variant="outline" className="border-border/60 bg-background/40">Live set</Badge>
                            <Badge variant="outline" className="border-border/60 bg-background/40">Field recording</Badge>
                        </div>
                        <div className="text-muted-foreground mt-3 text-sm">
                            Add cover art, credits, and a listen-first flow.
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
