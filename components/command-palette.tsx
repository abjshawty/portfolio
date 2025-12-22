"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";

import {
    ArrowRightIcon,
    ChatCircleTextIcon,
    CompassIcon,
    CodeIcon,
    MagnifyingGlassIcon,
} from "@phosphor-icons/react";

let cachedIndex: SearchIndex | null = null;
let cachedIndexPromise: Promise<SearchIndex> | null = null;

async function fetchSearchIndex () {
    if (cachedIndex) return cachedIndex;
    if (!cachedIndexPromise) {
        cachedIndexPromise = fetch("/api/search-index")
            .then((res) => res.json() as Promise<SearchIndex>)
            .then((json) => {
                cachedIndex = json;
                return json;
            });
    }

    return cachedIndexPromise;
}

type SearchItem = {
    title: string;
    href: string;
    subtitle?: string;
    group: string;
};

type SearchIndex = {
    pages: SearchItem[];
    projects: SearchItem[];
    rants: SearchItem[];
};

function useHotkeys (onToggle: () => void) {
    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const isK = e.key.toLowerCase() === "k";
            if (isK && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onToggle();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onToggle]);
}

export function CommandPalette ({
    trigger,
    open: openProp,
    onOpenChange,
}: {
    trigger?: (props: { onClick: () => void; onPreload: () => void; }) => React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}) {
    const router = useRouter();
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
    const open = openProp ?? uncontrolledOpen;
    const setOpen = React.useCallback(
        (next: boolean | ((prev: boolean) => boolean)) => {
            const value = typeof next === "function" ? next(open) : next;
            onOpenChange?.(value);
            if (openProp === undefined) setUncontrolledOpen(value);
        },
        [onOpenChange, open, openProp]
    );
    const [index, setIndex] = React.useState<SearchIndex | null>(null);

    useHotkeys(() => setOpen((v) => !v));

    const preload = React.useCallback(() => {
        if (index) return;
        void fetchSearchIndex().then((json) => {
            setIndex((prev) => prev ?? json);
        });
    }, [index]);

    React.useEffect(() => {
        if (!open || index) return;

        let cancelled = false;
        void fetchSearchIndex().then((json) => {
            if (!cancelled) setIndex(json);
        });

        return () => {
            cancelled = true;
        };
    }, [open, index]);

    React.useEffect(() => {
        if (!index && cachedIndex) setIndex(cachedIndex);
    }, [index]);

    const allItems = React.useMemo(() => {
        if (!index) return [] as SearchItem[];
        return [...index.pages, ...index.projects, ...index.rants];
    }, [index]);

    const groups = React.useMemo(() => {
        const map = new Map<string, SearchItem[]>();
        for (const item of allItems) {
            const list = map.get(item.group) ?? [];
            list.push(item);
            map.set(item.group, list);
        }
        return Array.from(map.entries());
    }, [allItems]);

    const onSelect = React.useCallback(
        (href: string) => {
            setOpen(false);
            router.push(href);
        },
        [router]
    );

    const getGroupIcon = React.useCallback((group: string) => {
        if (group.toLowerCase() === "pages") return CompassIcon;
        if (group.toLowerCase() === "projects") return CodeIcon;
        if (group.toLowerCase() === "rants") return ChatCircleTextIcon;
        return ArrowRightIcon;
    }, []);

    return (
        <>
            {trigger ? (
                trigger({ onClick: () => setOpen(true), onPreload: preload })
            ) : (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    onMouseEnter={preload}
                    onFocus={preload}
                    className="border-border/60 bg-background/40 text-muted-foreground hover:text-foreground inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors"
                >
                    <MagnifyingGlassIcon />
                    Search
                    <span className="ml-2 hidden items-center gap-1 sm:inline-flex">
                        <kbd className="border-border/60 bg-muted/20 rounded-md border px-1.5 py-0.5 text-[10px]">Ctrl</kbd>
                        <kbd className="border-border/60 bg-muted/20 rounded-md border px-1.5 py-0.5 text-[10px]">K</kbd>
                    </span>
                </button>
            )}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="overflow-hidden">
                    <Command className="min-h-[320px]">
                        <CommandInput placeholder="Search pages, projects, rants…" />
                        <CommandList>
                            <CommandEmpty>Nothing found.</CommandEmpty>

                            {!index ? (
                                <CommandGroup heading="Loading">
                                    <CommandItem value="loading" disabled>
                                        Fetching index…
                                    </CommandItem>
                                </CommandGroup>
                            ) : (
                                groups.map(([group, items], idx) => (
                                    <React.Fragment key={group}>
                                        <CommandGroup heading={group}>
                                            {items.map((item) => (
                                                <CommandItem
                                                    key={item.href}
                                                    value={`${item.title} ${item.subtitle ?? ""}`}
                                                    onSelect={() => onSelect(item.href)}
                                                >
                                                    {(() => {
                                                        const Icon = getGroupIcon(item.group);
                                                        return (
                                                            <span className="text-muted-foreground shrink-0">
                                                                <Icon />
                                                            </span>
                                                        );
                                                    })()}
                                                    <div className="min-w-0 flex-1">
                                                        <div className="truncate font-medium">{item.title}</div>
                                                        {item.subtitle ? (
                                                            <div className="text-muted-foreground truncate text-xs">
                                                                {item.subtitle}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <CommandShortcut>
                                                        <ArrowRightIcon />
                                                    </CommandShortcut>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                        {idx < groups.length - 1 ? <CommandSeparator /> : null}
                                    </React.Fragment>
                                ))
                            )}
                        </CommandList>
                    </Command>
                </DialogContent>
            </Dialog>
        </>
    );
}
