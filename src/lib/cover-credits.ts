// The artwork behind each fallback cover in public/covers/<slug>.jpg, shown
// under the article hero. All are public domain; most come from the Art
// Institute of Chicago's open-access (CC0) collection.
export type CoverCredit = {
    title: string
    author: string
    license: string
    licenseUrl?: string
    source: string
}

export const COVER_CREDITS: Record<string, CoverCredit> = {
    'thundering-herd-in-distributed-systems': {
        title: 'Under the Wave off Kanagawa, also known as The Great Wave',
        author: 'Katsushika Hokusai, 1830/33',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://www.artic.edu/artworks/24645',
    },
}
