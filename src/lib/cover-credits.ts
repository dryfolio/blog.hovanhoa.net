// Who took each fallback cover in public/covers/<slug>.jpg, shown under the
// article hero. CC BY / BY-SA photos must keep their credit and license.
export type CoverCredit = {
    title: string
    author: string
    license: string
    licenseUrl?: string
    source: string
}

export const COVER_CREDITS: Record<string, CoverCredit> = {
    'thundering-herd-in-distributed-systems': {
        title: 'Wildebeests migration crossing',
        author: 'Naturaltracksafaris',
        license: 'CC BY-SA 4.0, resized',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        source: 'https://commons.wikimedia.org/wiki/File:Wildebeests_migration_crossing.jpg',
    },
    'why-i-chose-twitter-snowflake-id': {
        title: 'Snow Flake',
        author: 'Macro Mama',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://stocksnap.io/photo/snow-flake-DPPBWTSVDN',
    },
    'cap-theorem-in-distributed-systems': {
        title: 'Network Cable',
        author: 'Lenharth Systems',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://stocksnap.io/photo/network-cable-KNXOKCUSCK',
    },
    'go-concurrency-goroutines-channels': {
        title: 'Dark Night',
        author: 'Caleb George',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://stocksnap.io/photo/dark-night-08770132A3',
    },
    'building-a-url-shortener-service-using-golang': {
        title: 'Chain Rusty',
        author: 'Fré Sonneveld',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://stocksnap.io/photo/chain-rusty-MYIW7G9AXA',
    },
    'building-an-ai-agent-in-go': {
        title: 'Robot Technology',
        author: 'Alex Knight',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://stocksnap.io/photo/robot-technology-WUBMLJRYEK',
    },
    'jenkins-cicd-on-aws-ec2': {
        title: 'Industrial piping system, factory pipes',
        author: 'U.S. Army',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://www.rawpixel.com/image/10995767/industrial-piping-system-factory-pipes',
    },
    'live-reload-in-go-with-air': {
        title: 'Free hot air balloon dawn',
        author: '',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://www.rawpixel.com/image/5907319/photo-image-public-domain-free-travel',
    },
    'load-testing-k6-search-optimization': {
        title: 'Free car speedometer 100 image',
        author: '',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://www.rawpixel.com/image/5908631/photo-image-background-public-domain-free',
    },
    'looking-back-at-2024': {
        title: 'Sunrise Trees',
        author: 'Glen Carrie',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://stocksnap.io/photo/sunrise-trees-47DD83C293',
    },
    '2025-rewind': {
        title: 'Ma Pi Leng, Vietnam landscape',
        author: '',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: 'https://www.rawpixel.com/image/3305131/free-photo-image-cc0-cliff-countryside',
    },
}
