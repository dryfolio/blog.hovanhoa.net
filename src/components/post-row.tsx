import Image from 'next/image'
import Link from 'next/link'
import formatDate from '@/lib/format-date'
import { TagPill } from '@/components/redesign/tag-pill'
import { type PostExcerpt, type Tag } from '@/lib/types'

// One hairline row in the post index. The title link's ::after stretches over
// the whole row; tag pills sit above it (z-10) so they stay clickable filters.
export function PostRow({
    post,
    activeTags = [],
}: {
    post: PostExcerpt
    activeTags?: string[]
}) {
    return (
        <article
            data-reveal
            className="group relative grid gap-x-8 gap-y-2 border-b border-[var(--rd-line)] px-[clamp(1rem,2.5vw,1.5rem)] py-[1.15rem] transition-colors last:border-b-0 hover:bg-[var(--rd-surface-2)] min-[720px]:grid-cols-[9.5rem_minmax(0,1fr)_9rem]"
        >
            <time
                dateTime={post.publishedAt}
                className="pt-[0.2rem] font-[family-name:var(--font-mono)] text-[0.72rem] text-[var(--rd-text-3)]"
            >
                {formatDate(post.publishedAt)}
            </time>
            <div className="min-w-0">
                <h3 className="m-0 text-[1.02rem] font-medium leading-[1.35] tracking-[-0.02em] text-[var(--rd-text)] transition-colors group-has-[[data-card-link]:hover]:text-[var(--rd-accent-ink)]">
                    <Link
                        href={`/${post.slug}`}
                        prefetch={false}
                        data-card-link=""
                        className="after:absolute after:inset-0 after:content-['']"
                    >
                        {post.title}
                    </Link>
                </h3>
                <p className="m-0 mt-1 line-clamp-2 max-w-[68ch] text-[0.875rem] leading-[1.55] text-[var(--rd-text-2)]">
                    {post.brief}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    {post.tags.map((tag: Tag) => (
                        <TagPill
                            key={tag.name}
                            name={tag.name}
                            activeTags={activeTags}
                        />
                    ))}
                    <span className="ml-1 font-[family-name:var(--font-mono)] text-[0.72rem] text-[var(--rd-text-3)]">
                        {post.readTimeInMinutes} min
                    </span>
                </div>
            </div>
            {post.coverImage.url && (
                <div className="relative hidden aspect-[16/10] self-start overflow-hidden rounded-[var(--rd-r-sm)] border border-[var(--rd-border)] bg-[var(--rd-surface-2)] min-[720px]:block">
                    <Image
                        src={post.coverImage.url}
                        alt=""
                        fill
                        sizes="144px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                </div>
            )}
        </article>
    )
}

export function PostList({
    posts,
    activeTags,
}: {
    posts: PostExcerpt[]
    activeTags?: string[]
}) {
    return (
        <div className="overflow-hidden rounded-[var(--rd-r-lg)] border border-[var(--rd-border)] bg-[var(--rd-surface)]">
            {posts.map((post) => (
                <PostRow key={post.id} post={post} activeTags={activeTags} />
            ))}
        </div>
    )
}

export default PostRow
