import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { site } from "@/lib/mock-data";

export function SiteFooter () {
    return (
        <footer className="border-border/60 border-t">
            <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
                <div className="grid gap-8 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <div className="text-sm font-semibold">{site.name}</div>
                        <div className="text-muted-foreground mt-2 text-sm leading-relaxed">
                            {site.tagline}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
                        <div>
                            <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                                Explore
                            </div>
                            <div className="mt-3 grid gap-2 text-sm">
                                <Link href="/projects" className="hover:text-foreground text-muted-foreground transition-colors">
                                    Projects
                                </Link>
                                <Link href="/music" className="hover:text-foreground text-muted-foreground transition-colors">
                                    Music
                                </Link>
                                <Link href="/paintings" className="hover:text-foreground text-muted-foreground transition-colors">
                                    Paintings
                                </Link>
                                <Link href="/rants" className="hover:text-foreground text-muted-foreground transition-colors">
                                    Rants
                                </Link>
                            </div>
                        </div>

                        <div>
                            <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                                Elsewhere
                            </div>
                            <div className="mt-3 grid gap-2 text-sm">
                                <a
                                    className="hover:text-foreground text-muted-foreground transition-colors"
                                    href={site.links.github}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub
                                </a>
                                <a
                                    className="hover:text-foreground text-muted-foreground transition-colors"
                                    href={site.links.youtube}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    YouTube
                                </a>
                                <a
                                    className="hover:text-foreground text-muted-foreground transition-colors"
                                    href={site.links.soundcloud}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    SoundCloud
                                </a>
                            </div>
                        </div>

                        <div>
                            <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                                Contact
                            </div>
                            <div className="mt-3 grid gap-2 text-sm">
                                <a
                                    className="hover:text-foreground text-muted-foreground transition-colors"
                                    href="mailto:hello@example.com"
                                >
                                    hello@example.com
                                </a>
                                <span className="text-muted-foreground">UTC±0</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="text-muted-foreground flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
                    <div>© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
                    <div className="text-muted-foreground/80">Built with Next.js + shadcn/ui.</div>
                </div>
            </div>
        </footer>
    );
}
