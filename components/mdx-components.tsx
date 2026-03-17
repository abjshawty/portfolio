import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
    a: (props) => (
        <a
            {...props}
            className={`text-primary underline underline-offset-4 hover:opacity-90 ${props.className ?? ""}`}
            target={props.target ?? "_blank"}
            rel={props.rel ?? "noreferrer"}
        />
    ),
    h1: (props) => (
        <h1 {...props} className={`text-2xl font-semibold tracking-tight ${props.className ?? ""}`} />
    ),
    h2: (props) => (
        <h2 {...props} className={`mt-10 text-xl font-semibold tracking-tight ${props.className ?? ""}`} />
    ),
    h3: (props) => (
        <h3 {...props} className={`mt-6 text-lg font-semibold tracking-tight ${props.className ?? ""}`} />
    ),
    p: (props) => (
        <p {...props} className={`text-muted-foreground mt-4 leading-relaxed ${props.className ?? ""}`} />
    ),
    ul: (props) => (
        <ul {...props} className={`text-muted-foreground mt-4 list-disc space-y-2 pl-6 ${props.className ?? ""}`} />
    ),
    ol: (props) => (
        <ol {...props} className={`text-muted-foreground mt-4 list-decimal space-y-2 pl-6 ${props.className ?? ""}`} />
    ),
    li: (props) => <li {...props} className={`leading-relaxed ${props.className ?? ""}`} />,
    blockquote: (props) => (
        <blockquote
            {...props}
            className={`border-border/60 bg-muted/15 text-foreground/90 mt-6 rounded-2xl border px-5 py-4 ${props.className ?? ""}`}
        />
    ),
    code: (props) => (
        <code
            {...props}
            className={`bg-muted/40 rounded-md px-1.5 py-0.5 text-[0.95em] ${props.className ?? ""}`}
        />
    ),
    pre: (props) => (
        <pre
            {...props}
            className={`border-border/60 bg-muted/20 mt-6 overflow-x-auto rounded-2xl border p-4 text-sm ${props.className ?? ""}`}
        />
    ),
    hr: (props) => <hr {...props} className={`border-border/60 my-10 ${props.className ?? ""}`} />,
    Audio: (props: { src: string; title?: string; }) => (
        <div className="border-border/60 bg-background/30 mt-6 rounded-2xl border p-4">
            {props.title ? <div className="text-sm font-medium">{props.title}</div> : null}
            <audio controls className="mt-3 w-full" src={props.src} />
        </div>
    ),
    Video: (props: { src: string; title?: string; }) => (
        <div className="border-border/60 bg-background/30 mt-6 overflow-hidden rounded-2xl border">
            {props.title ? <div className="border-border/60 border-b px-4 py-3 text-sm font-medium">{props.title}</div> : null}
            <video controls className="w-full" src={props.src} />
        </div>
    ),
    YouTube: (props: { id: string; title?: string; }) => (
        <div className="border-border/60 bg-background/30 mt-6 overflow-hidden rounded-2xl border">
            {props.title ? <div className="border-border/60 border-b px-4 py-3 text-sm font-medium">{props.title}</div> : null}
            <div className="relative aspect-video">
                <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${props.id}`}
                    title={props.title ?? "YouTube video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    ),
};
