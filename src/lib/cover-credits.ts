// Credits for fallback covers in public/covers/<slug>.jpg, shown under the
// article hero. Covers without an entry here are the author's own images.
export type CoverCredit = {
    title: string
    author: string
    license: string
    licenseUrl?: string
    source: string
}

export const COVER_CREDITS: Record<string, CoverCredit> = {
    '2025-rewind': {
        title: 'Nho Que river, Ha Giang',
        author: 'Ryan Le',
        license: 'Unsplash License, cropped',
        licenseUrl: 'https://unsplash.com/license',
        source: 'https://unsplash.com/photos/o7YAmt6QujI',
    },
}
