export type TagCategory = 'engineering' | 'ai' | 'life'

// Maps every tag currently in use to a category color bucket (see the
// --rd-label-* tokens in globals.css). New tags must be added here —
// unrecognized tags silently fall back to 'engineering'.
const TAG_CATEGORY: Record<string, TagCategory> = {
    'system design': 'engineering',
    golang: 'engineering',
    'distributed systems': 'engineering',
    concurrency: 'engineering',
    'ci-cd': 'engineering',
    testing: 'engineering',
    'ai agents': 'ai',
    life: 'life',
}

export function categoryFor(tagName: string): TagCategory {
    return TAG_CATEGORY[tagName.toLowerCase()] ?? 'engineering'
}
