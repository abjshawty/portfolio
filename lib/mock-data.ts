export type Project = {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    year: string;
    linkLabel: string;
};

export type Track = {
    id: string;
    title: string;
    mood: string;
    duration: string;
    year: string;
};

export type Painting = {
    id: string;
    title: string;
    medium: string;
    size: string;
    year: string;
};

export type RantKind = "text" | "audio" | "video";

export type Rant = {
    id: string;
    slug: string;
    kind: RantKind;
    title: string;
    date: string;
    excerpt: string;
    duration?: string;
    src?: string;
};

export const site = {
    name: "Center View",
    tagline: "Projects, music, paintings, and unapologetically long rants.",
    location: "Somewhere between a terminal and a canvas",
    links: {
        github: "https://github.com/",
        youtube: "https://www.youtube.com/",
        soundcloud: "https://soundcloud.com/",
    },
};

export const featuredProjects: Project[] = [
    {
        slug: "signal-garden",
        title: "Signal Garden",
        summary:
            "A realtime visualizer that treats telemetry like music: layered, rhythmic, and occasionally angry.",
        tags: ["Next.js", "WebGL", "Streaming"],
        year: "2025",
        linkLabel: "Case study",
    },
    {
        slug: "midnight-linter",
        title: "Midnight Linter",
        summary:
            "A code-quality assistant that prioritizes vibes: fast feedback, quiet UX, zero shame.",
        tags: ["TypeScript", "DX", "Tooling"],
        year: "2024",
        linkLabel: "Read more",
    },
    {
        slug: "paper-choir",
        title: "Paper Choir",
        summary:
            "Generative sheet-music sketches that turn constraints into compositions.",
        tags: ["Generative", "Music", "Design"],
        year: "2023",
        linkLabel: "Explore",
    },
];

export const tracks: Track[] = [
    { id: "t1", title: "Low Orbit", mood: "nocturnal", duration: "3:42", year: "2025" },
    { id: "t2", title: "Dust on the Faders", mood: "warm distortion", duration: "5:08", year: "2024" },
    { id: "t3", title: "Rookery", mood: "restless", duration: "2:57", year: "2024" },
    { id: "t4", title: "Unfinished Cathedral", mood: "slow build", duration: "6:11", year: "2023" },
];

export const paintings: Painting[] = [
    {
        id: "p1",
        title: "Night Debugger",
        medium: "oil on canvas",
        size: "70×50",
        year: "2025",
    },
    {
        id: "p2",
        title: "Syntax of Rain",
        medium: "acrylic",
        size: "60×60",
        year: "2024",
    },
    {
        id: "p3",
        title: "Latency Study",
        medium: "ink + wash",
        size: "42×30",
        year: "2023",
    },
    {
        id: "p4",
        title: "Blue Screen Prayer",
        medium: "gouache",
        size: "50×40",
        year: "2023",
    },
];

export const rants: Rant[] = [
    {
        id: "r1",
        slug: "on-shipping-the-art-of-stopping",
        kind: "text",
        title: "On shipping: the art of stopping",
        date: "2025-11-18",
        excerpt:
            "At some point the work stops improving and starts collecting dust. Shipping is the broom.",
    },
    {
        id: "r2",
        slug: "why-i-record-voice-notes-instead-of-tweets",
        kind: "audio",
        title: "Why I record voice notes instead of tweets",
        date: "2025-10-02",
        duration: "8:19",
        excerpt:
            "Text flattens the emotion. Audio keeps the cracks and the breath — the important parts.",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
        id: "r3",
        slug: "a-furious-walk-through-my-folder-structure",
        kind: "video",
        title: "A furious walk through my folder structure",
        date: "2025-08-20",
        duration: "4:05",
        excerpt:
            "It’s not messy, it’s stratified. Like geology. Like trauma. Like TypeScript.",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
];
