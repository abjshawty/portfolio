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
import { rants } from "@/lib/mock-data";

import {
    ArrowRightIcon,
    MicrophoneStageIcon,
    QuotesIcon,
    VideoCameraIcon,
} from "@phosphor-icons/react";

export default function RantsPage () {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="text-primary grid size-10 place-items-center rounded-2xl bg-primary/10 ring-1 ring-border/60">
                        <QuotesIcon />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Rants</h1>
                        <div className="text-muted-foreground text-sm">
                            Text, audio, video — choose your preferred intensity.
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-border/60 bg-background/40">text</Badge>
                    <Badge variant="outline" className="border-border/60 bg-background/40">audio</Badge>
                    <Badge variant="outline" className="border-border/60 bg-background/40">video</Badge>
                    <Badge variant="outline" className="border-border/60 bg-background/40">hot takes</Badge>
                </div>
            </section>

            <Separator className="border-border/60" />

            <section className="grid gap-4 lg:grid-cols-3">
                {rants.map((r) => (
                    <Card key={r.id} className="border-border/60 bg-card/70 lg:col-span-1">
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

                            {r.kind === "audio" && r.src ? (
                                <div className="mt-4 rounded-2xl border border-border/60 bg-background/30 p-3">
                                    <div className="text-sm font-medium">Audio</div>
                                    <div className="mt-2">
                                        <audio controls className="w-full" src={r.src} />
                                    </div>
                                </div>
                            ) : null}

                            {r.kind === "video" && r.src ? (
                                <div className="mt-4 overflow-hidden rounded-2xl border border-border/60 bg-background/30">
                                    <video controls className="w-full" src={r.src} />
                                </div>
                            ) : null}
                        </CardContent>
                        <CardFooter className="bg-muted/20 border-border/60">
                            <Button variant="ghost" className="ml-auto">
                                Open
                                <ArrowRightIcon data-icon="inline-end" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </section>

            <section className="border-border/60 bg-muted/10 rounded-3xl border p-6">
                <div className="text-sm font-medium">Next step</div>
                <div className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    Add a real post format with slugs, markdown, and media uploads.
                </div>
            </section>
        </div>
    );
}
