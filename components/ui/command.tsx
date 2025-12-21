"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "@/lib/utils";

function Command ({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
    return (
        <CommandPrimitive
            data-slot="command"
            className={cn(
                "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-xl",
                className
            )}
            {...props}
        />
    );
}

function CommandInput ({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
    return (
        <div className="border-border/60 flex items-center gap-2 border-b px-4 py-3">
            <CommandPrimitive.Input
                data-slot="command-input"
                className={cn(
                    "placeholder:text-muted-foreground flex h-8 w-full bg-transparent text-sm outline-none",
                    className
                )}
                {...props}
            />
            <kbd className="text-muted-foreground hidden rounded-md border border-border/60 bg-muted/20 px-2 py-1 text-[10px] font-medium sm:inline-flex">
                ESC
            </kbd>
        </div>
    );
}

function CommandList ({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
    return (
        <CommandPrimitive.List
            data-slot="command-list"
            className={cn("max-h-[60vh] overflow-y-auto p-2", className)}
            {...props}
        />
    );
}

function CommandEmpty ({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
    return (
        <CommandPrimitive.Empty
            data-slot="command-empty"
            className={cn("text-muted-foreground px-4 py-6 text-sm", className)}
            {...props}
        />
    );
}

function CommandGroup ({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
    return (
        <CommandPrimitive.Group
            data-slot="command-group"
            className={cn(
                "text-muted-foreground [&_[data-slot=command-group-heading]]:text-muted-foreground overflow-hidden p-1 text-xs [&_[data-slot=command-group-heading]]:px-2 [&_[data-slot=command-group-heading]]:py-2 [&_[data-slot=command-group-heading]]:font-medium",
                className
            )}
            {...props}
        />
    );
}

function CommandSeparator ({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
    return (
        <CommandPrimitive.Separator
            data-slot="command-separator"
            className={cn("bg-border/60 -mx-1 my-1 h-px", className)}
            {...props}
        />
    );
}

function CommandItem ({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
    return (
        <CommandPrimitive.Item
            data-slot="command-item"
            className={cn(
                "aria-selected:bg-muted/50 aria-selected:text-foreground flex cursor-default items-center gap-2 rounded-lg px-2 py-2 text-sm outline-none select-none",
                className
            )}
            {...props}
        />
    );
}

function CommandShortcut ({
    className,
    ...props
}: React.ComponentProps<"span">) {
    return (
        <span
            data-slot="command-shortcut"
            className={cn("text-muted-foreground ml-auto text-xs", className)}
            {...props}
        />
    );
}

export {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandSeparator,
    CommandItem,
    CommandShortcut,
};
