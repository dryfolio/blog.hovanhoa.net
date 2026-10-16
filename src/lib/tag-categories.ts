export type TagColor =
    | 'blue'
    | 'teal'
    | 'indigo'
    | 'amber'
    | 'orange'
    | 'violet'
    | 'green'
    | 'pink'

// Maps every tag currently in use to a pastel pill color (see the
// --rd-label-* tokens in globals.css). New tags must be added here —
// unrecognized tags silently fall back to 'blue'.
const TAG_COLOR: Record<string, TagColor> = {
    'system design': 'blue',
    golang: 'teal',
    'distributed systems': 'indigo',
    concurrency: 'amber',
    'ci-cd': 'orange',
    testing: 'violet',
    'ai agents': 'green',
    life: 'pink',
}

export function categoryFor(tagName: string): TagColor {
    return TAG_COLOR[tagName.toLowerCase()] ?? 'blue'
}
