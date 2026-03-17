import * as React from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell ({ children }: { children: React.ReactNode; }) {
    return (
        <div className="bg-background text-foreground min-h-dvh">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-24 left-1/2 h-[34rem] w-[44rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute -bottom-28 left-1/2 h-[28rem] w-[52rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0.10),rgba(255,255,255,0))] dark:bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0.08),rgba(255,255,255,0))]" />
            </div>

            <SiteHeader />
            <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
                {children}
            </main>
            <SiteFooter />
        </div>
    );
}
