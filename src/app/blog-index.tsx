'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FeaturedPost } from '@/components/featured-post'
import { PostList } from '@/components/post-row'
import { SectionHead, sectionLink } from '@/components/section-head'
import { TagPill } from '@/components/redesign/tag-pill'
import { type PostExcerpt } from '@/lib/types'

type Props = { allPosts: PostExcerpt[]; allTags: string[] }

export function BlogIndexFromUrl(props: Props) {
    const searchParams = useSearchParams()
    return (
        <BlogIndex {...props} rawTag={searchParams.getAll('tag').join(',')} />
    )
}

export function BlogIndex({
    allPosts,
    allTags,
    rawTag,
}: Props & { rawTag: string }) {
    const activeTags = rawTag
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    const activeSet = new Set(activeTags.map((t) => t.toLowerCase()))

    const postsArr = activeSet.size
        ? allPosts.filter((p) =>
              p.tags.some((t) => activeSet.has(t.name.toLowerCase()))
          )
        : allPosts

    return (
        <>
            {/* ---- page header ---- */}
            <section className="mx-auto w-full max-w-[var(--rd-maxw)] px-[var(--rd-pad)] pb-[clamp(2rem,4vw,3rem)] pt-[clamp(3.5rem,8vw,6.5rem)]">
                <div className="rd-rise">
                    <div className="flex items-baseline gap-3">
                        <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2.1rem,4.5vw,3.4rem)] font-normal leading-[1.08] tracking-[-0.03em] text-[var(--rd-text)]">
                            Writing
                        </h1>
                        <span className="font-[family-name:var(--font-mono)] text-base text-[var(--rd-text-3)]">
                            {allPosts.length}
                        </span>
                    </div>
                    <p className="m-0 mt-4 max-w-[56ch] text-[clamp(0.98rem,1.25vw,1.0625rem)] leading-[1.65] text-[var(--rd-text-2)]">
                        Notes on software engineering, distributed systems, and
                        lessons from building things, with the occasional life
                        update in between.
                    </p>
                    <nav
                        aria-label="Filter by tag"
                        className="mt-7 flex flex-wrap items-center gap-1.5"
                    >
                        <span className="mr-1.5 font-[family-name:var(--font-mono)] text-[0.72rem] text-[var(--rd-text-3)]">
                            {allTags.length} tags
                        </span>
                        {allTags.map((tag) => (
                            <TagPill
                                key={tag}
                                name={tag}
                                activeTags={activeTags}
                            />
                        ))}
                        {activeTags.length > 0 && (
                            <Link
                                href="/"
                                className={`${sectionLink} ml-2 text-[0.8125rem]`}
                            >
                                Clear filters
                                <span aria-hidden>✕</span>
                            </Link>
                        )}
                    </nav>
                </div>
            </section>

            {/* ---- post index ---- */}
            <section className="mx-auto max-w-[var(--rd-maxw)] px-[var(--rd-pad)] pb-[clamp(56px,8vw,96px)] pt-[clamp(1rem,2vw,1.5rem)]">
                {postsArr.length === 0 ? (
                    <p className="m-0 font-[family-name:var(--font-mono)] text-[0.8125rem] text-[var(--rd-text-3)]">
                        No posts tagged{' '}
                        <span className="text-[var(--rd-accent-ink)]">
                            {activeTags.map((t) => `#${t}`).join(' ')}
                        </span>{' '}
                        yet.
                    </p>
                ) : activeSet.size ? (
                    <>
                        <SectionHead
                            title={activeTags.map((t) => `#${t}`).join(' ')}
                            meta={`${postsArr.length} of ${allPosts.length} posts`}
                            links={[{ label: 'All posts', href: '/' }]}
                        />
                        <PostList posts={postsArr} activeTags={activeTags} />
                    </>
                ) : (
                    <>
                        <div className="rd-rise rd-rise-d1">
                            <FeaturedPost post={postsArr[0]} />
                        </div>
                        {postsArr.length > 1 && (
                            <div className="mt-[clamp(48px,6vw,72px)]">
                                <SectionHead
                                    title="Archive"
                                    meta={`${postsArr.length - 1} posts`}
                                />
                                <PostList posts={postsArr.slice(1)} />
                            </div>
                        )}
                    </>
                )}
            </section>
        </>
    )
}
