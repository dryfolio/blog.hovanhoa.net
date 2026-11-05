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
    'cap-theorem-in-distributed-systems': {
        title: 'Sudden Shower over Shin Ohashi Bridge and Atake',
        author: 'Utagawa Hiroshige, 1857',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://www.artic.edu/artworks/64447',
    },
    'load-testing-k6-search-optimization': {
        title: 'Awa Province: Naruto Whirlpools',
        author: 'Utagawa Hiroshige, 1855',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://www.artic.edu/artworks/130577',
    },
    'live-reload-in-go-with-air': {
        title: 'Ejiri in Suruga Province',
        author: 'Katsushika Hokusai, c. 1830/33',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://www.artic.edu/artworks/24800',
    },
    'go-concurrency-goroutines-channels': {
        title: 'Paris Street; Rainy Day',
        author: 'Gustave Caillebotte, 1877',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://www.artic.edu/artworks/20684',
    },
    '2025-rewind': {
        title: 'Arrival of the Normandy Train, Gare Saint-Lazare',
        author: 'Claude Monet, 1877',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://www.artic.edu/artworks/16571',
    },
    'looking-back-at-2024': {
        title: 'Snow at Louveciennes',
        author: 'Camille Pissarro, c. 1870',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://www.artic.edu/artworks/45838',
    },
    'building-an-ai-agent-in-go': {
        title: 'Improvisation No. 30',
        author: 'Vasily Kandinsky, 1913',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://www.artic.edu/artworks/8991',
    },
    'building-a-url-shortener-service-using-golang': {
        title: 'Painting with Green Center',
        author: 'Vasily Kandinsky, 1913',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://www.artic.edu/artworks/8987',
    },
    'jenkins-cicd-on-aws-ec2': {
        title: 'Composition Gray-Red',
        author: 'Piet Mondrian, 1935',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://www.artic.edu/artworks/65821',
    },
    'why-i-chose-twitter-snowflake-id': {
        title: 'Snowflakes',
        author: 'Wilson Bentley, c. 1902',
        license: 'Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:SnowflakesWilsonBentley.jpg',
    },
}
