"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/command-palette";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { site } from "@/lib/mock-data";

import {
    GithubLogoIcon,
    ListIcon,
    MagnifyingGlassIcon,
    MonitorIcon,
    MoonIcon,
    SoundcloudLogoIcon,
    SunIcon,
    YoutubeLogoIcon,
} from "@phosphor-icons/react";

const nav = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/music", label: "Music" },
    { href: "/paintings", label: "Paintings" },
    { href: "/rants", label: "Rants" },
] as const;

export function SiteHeader () {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [paletteOpen, setPaletteOpen] = React.useState(false);
    const [menuOpen, setMenuOpen] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="supports-[backdrop-filter]:bg-background/60 border-border/60 sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
                <Link
                    href="/"
                    className="group flex items-center gap-2 min-w-0"
                    aria-label={`${site.name} home`}
                >
                    <div className="relative grid size-9 place-items-center">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-primary/40 via-primary/15 to-transparent" />
                        <div className="ring-foreground/10 relative grid size-9 place-items-center rounded-xl bg-card/70 text-sm font-semibold ring-1">
                            CV
                        </div>
                    </div>
                    <div className="min-w-0">
                        <div className="leading-tight font-semibold truncate">
                            {site.name}
                        </div>
                        <div className="text-muted-foreground text-xs leading-tight truncate">
                            {site.location}
                        </div>
                    </div>
                </Link>

                <nav className="ml-4 hidden items-center gap-1 md:flex">
                    {nav.map((item) => (
                        <Button key={item.href} asChild variant="ghost" size="sm">
                            <Link href={item.href}>{item.label}</Link>
                        </Button>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-2">
                    <CommandPalette
                        open={paletteOpen}
                        onOpenChange={setPaletteOpen}
                        trigger={({ onClick, onPreload }) => (
                            <div className="hidden md:block">
                                <Button
                                    type="button"
                                    onClick={onClick}
                                    onMouseEnter={onPreload}
                                    onFocus={onPreload}
                                    variant="outline"
                                    size="sm"
                                    className="border-border/60 bg-background/40"
                                >
                                    <MagnifyingGlassIcon data-icon="inline-start" />
                                    Search
                                    <span className="text-muted-foreground ml-2 hidden items-center gap-1 lg:inline-flex">
                                        <kbd className="border-border/60 bg-muted/20 rounded-md border px-1.5 py-0.5 text-[10px]">
                                            Ctrl
                                        </kbd>
                                        <kbd className="border-border/60 bg-muted/20 rounded-md border px-1.5 py-0.5 text-[10px]">
                                            K
                                        </kbd>
                                    </span>
                                </Button>
                            </div>
                        )}
                    />

                    <div className="hidden items-center gap-2 sm:flex">
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-border/60 bg-background/40"
                        >
                            <a href={site.links.github} target="_blank" rel="noreferrer">
                                <GithubLogoIcon data-icon="inline-start" />
                                GitHub
                            </a>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="border-border/60 bg-background/40">
                            <a href={site.links.soundcloud} target="_blank" rel="noreferrer">
                                <SoundcloudLogoIcon data-icon="inline-start" />
                                Sound
                            </a>
                        </Button>
                    </div>

                    <Separator orientation="vertical" className="hidden h-8 md:block" />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="border-border/60 bg-background/40" aria-label="Theme">
                                {mounted && theme === "light" ? (
                                    <SunIcon />
                                ) : mounted && theme === "dark" ? (
                                    <MoonIcon />
                                ) : (
                                    <MonitorIcon />
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Theme</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={mounted ? theme : "system"} onValueChange={setTheme}>
                                <DropdownMenuRadioItem value="light">
                                    <SunIcon data-icon="inline-start" />
                                    Light
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="dark">
                                    <MoonIcon data-icon="inline-start" />
                                    Dark
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="system">
                                    <MonitorIcon data-icon="inline-start" />
                                    System
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Open menu">
                                <ListIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Navigate</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                {nav.map((item) => (
                                    <DropdownMenuItem key={item.href} asChild>
                                        <Link href={item.href}>{item.label}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                    setMenuOpen(false);
                                    setPaletteOpen(true);
                                }}
                            >
                                <button
                                    type="button"
                                    className="flex w-full items-center gap-2"
                                >
                                    <MagnifyingGlassIcon />
                                    Search
                                    <span className="ml-auto text-xs text-muted-foreground">Ctrl K</span>
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Elsewhere</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <a href={site.links.github} target="_blank" rel="noreferrer">
                                    <GithubLogoIcon data-icon="inline-start" />
                                    GitHub
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href={site.links.youtube} target="_blank" rel="noreferrer">
                                    <YoutubeLogoIcon data-icon="inline-start" />
                                    YouTube
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href={site.links.soundcloud} target="_blank" rel="noreferrer">
                                    <SoundcloudLogoIcon data-icon="inline-start" />
                                    SoundCloud
                                </a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
