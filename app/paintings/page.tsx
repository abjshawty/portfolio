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
import { paintings } from "@/lib/mock-data";

import { ArrowRightIcon, PaintBrushIcon } from "@phosphor-icons/react";

export default function PaintingsPage () {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="text-primary grid size-10 place-items-center rounded-2xl bg-primary/10 ring-1 ring-border/60">
                        <PaintBrushIcon />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Paintings</h1>
                        <div className="text-muted-foreground text-sm">
                            A gallery-first archive with room for process notes.
                        </div>
                    </div>
                </div>

                <div className="border-border/60 bg-background/30 rounded-2xl border p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="text-sm font-medium">Collection</div>
                            <div className="text-muted-foreground text-sm">
                                Placeholder thumbnails with metadata.
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="border-border/60 bg-background/40">oil</Badge>
                            <Badge variant="outline" className="border-border/60 bg-background/40">acrylic</Badge>
                            <Badge variant="outline" className="border-border/60 bg-background/40">ink</Badge>
                            <Badge variant="outline" className="border-border/60 bg-background/40">gouache</Badge>
                        </div>
                    </div>
                </div>
            </section>

            <Separator className="border-border/60" />

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {paintings.map((p) => (
                    <Card key={p.id} className="border-border/60 bg-card/70 overflow-hidden">
                        <div className="relative aspect-[4/3] w-full">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-background to-background" />
                            <div className="absolute inset-0 opacity-70 mix-blend-overlay bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.18),rgba(255,255,255,0))]" />
                            <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.06),transparent)]" />
                        </div>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between gap-3">
                                <span className="truncate">{p.title}</span>
                                <Badge variant="secondary" className="shrink-0">{p.year}</Badge>
                            </CardTitle>
                            <CardDescription>
                                {p.medium} · {p.size}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-muted-foreground text-sm">
                                Add photos, closeups, and a short note about what you learned.
                            </div>
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
                <div className="text-sm font-medium">Future gallery UX</div>
                <div className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    Lightbox, keyboard navigation, and a clean way to show series work.
                </div>
            </section>
        </div>
    );
}
