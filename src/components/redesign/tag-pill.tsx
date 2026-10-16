import Link from 'next/link'
import { categoryFor } from '@/lib/tag-categories'
import { toggleTagHref } from '@/lib/tag-filter-url'

const CATEGORY_VARS: Record<string, { bg: string; fg: string }> = {
    blue: { bg: 'var(--rd-label-blue)', fg: 'var(--rd-label-blue-fg)' },
    teal: { bg: 'var(--rd-label-teal)', fg: 'var(--rd-label-teal-fg)' },
    indigo: { bg: 'var(--rd-label-indigo)', fg: 'var(--rd-label-indigo-fg)' },
    amber: { bg: 'var(--rd-label-amber)', fg: 'var(--rd-label-amber-fg)' },
    orange: { bg: 'var(--rd-label-orange)', fg: 'var(--rd-label-orange-fg)' },
    violet: { bg: 'var(--rd-label-violet)', fg: 'var(--rd-label-violet-fg)' },
    green: { bg: 'var(--rd-label-green)', fg: 'var(--rd-label-green-fg)' },
    pink: { bg: 'var(--rd-label-pink)', fg: 'var(--rd-label-pink-fg)' },
}

export function TagPill({
    name,
    activeTags = [],
}: {
    name: string
    activeTags?: string[]
}) {
    const { bg, fg } = CATEGORY_VARS[categoryFor(name)] ?? CATEGORY_VARS.blue
    const isActive = activeTags.some(
        (t) => t.toLowerCase() === name.toLowerCase()
    )

    return (
        <Link
            href={toggleTagHref(name, activeTags)}
            className="relative z-10 inline-flex items-center rounded-full px-2 py-0.5 text-[0.68rem] font-medium tracking-[0.04em] transition-shadow"
            style={{
                background: bg,
                color: fg,
                boxShadow: isActive
                    ? 'inset 0 0 0 1.5px var(--rd-accent), 0 0 0 2px var(--rd-accent-bg)'
                    : 'none',
            }}
        >
            {name}
        </Link>
    )
}
