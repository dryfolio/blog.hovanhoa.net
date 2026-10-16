import Link from 'next/link'
import { categoryFor } from '@/lib/tag-categories'
import { toggleTagHref } from '@/lib/tag-filter-url'

const CATEGORY_VARS: Record<string, { bg: string; fg: string }> = {
    engineering: { bg: 'var(--rd-label-slate)', fg: 'var(--rd-label-slate-fg)' },
    ai: { bg: 'var(--rd-label-pine)', fg: 'var(--rd-label-pine-fg)' },
    life: { bg: 'var(--rd-label-plum)', fg: 'var(--rd-label-plum-fg)' },
}

export function TagPill({
    name,
    activeTags = [],
}: {
    name: string
    activeTags?: string[]
}) {
    const { bg, fg } = CATEGORY_VARS[categoryFor(name)]
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
