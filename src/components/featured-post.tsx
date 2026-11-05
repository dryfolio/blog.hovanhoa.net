import Link from 'next/link'
import formatDate from '@/lib/format-date'
import { TagPill } from '@/components/redesign/tag-pill'
import { type PostExcerpt, type Tag } from '@/lib/types'

// The latest post, given a larger serif treatment above the index.
export function FeaturedPost({
    post,
    activeTags = [],
}: {
    post: PostExcerpt
    activeTags?: string[]
}) {
    return (
        <article className="group relative overflow-hidden rounded-[var(--rd-r-lg)] border border-[var(--rd-border)] bg-[var(--rd-surface)] p-[clamp(1.25rem,3vw,2.25rem)] transition-colors hover:border-[var(--rd-border-2)]">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-[family-name:var(--font-mono)] text-[0.72rem] text-[var(--rd-text-3)]">
                <span className="text-[var(--rd-accent-ink)]">Latest</span>
                <span aria-hidden>·</span>
                <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                </time>
                <span aria-hidden>·</span>
                <span>{post.readTimeInMinutes} min read</span>
            </div>
            <h2 className="m-0 mt-3 max-w-[30ch] text-balance font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.2vw,2.35rem)] font-normal leading-[1.12] tracking-[-0.03em] text-[var(--rd-text)] transition-colors group-has-[[data-card-link]:hover]:text-[var(--rd-accent-ink)]">
                <Link
                    href={`/${post.slug}`}
                    data-card-link=""
                    className="after:absolute after:inset-0 after:content-['']"
                >
                    {post.title}
                </Link>
            </h2>
            <p className="m-0 mt-3 max-w-[62ch] text-[clamp(0.95rem,1.2vw,1.02rem)] leading-[1.6] text-[var(--rd-text-2)]">
                {post.brief}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag: Tag) => (
                        <TagPill
                            key={tag.name}
                            name={tag.name}
                            activeTags={activeTags}
                        />
                    ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[0.875rem] text-[var(--rd-text-2)] transition-colors group-has-[[data-card-link]:hover]:text-[var(--rd-text)]">
                    Read post
                    <span
                        aria-hidden
                        className="transition-transform group-has-[[data-card-link]:hover]:translate-x-0.5"
                    >
                        →
                    </span>
                </span>
            </div>
        </article>
    )
}

export default FeaturedPost
