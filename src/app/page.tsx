import Link from 'next/link'
import Navbar from '@/components/nav'
import PostTile from '@/components/post-tile'
import { Footer } from '@/components/footer'
import { Eyebrow } from '@/components/redesign/eyebrow'
import { Posts } from '@/lib/posts'
import { toggleTagHref } from '@/lib/tag-filter-url'
import { type PostExcerpt } from '@/lib/types'
import {
    BLOG_URL,
    FULL_NAME,
    GITHUB,
    IMAGE,
    LINKEDIN,
    NAME,
    ROLE,
    TWITTER,
} from '@/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'hovanhoa | blog',
    description: `${FULL_NAME} - ${ROLE}. Notes on backend systems, distributed systems, and shipping things that stay calm under load.`,
    alternates: {
        canonical: BLOG_URL,
    },
}

export default function BlogHome({
    searchParams,
}: {
    searchParams?: { tag?: string | string[] }
}) {
    const allPosts: PostExcerpt[] = Posts.getAllSummaries()
    const allTags = Array.from(
        new Set(allPosts.flatMap((p) => p.tags.map((t) => t.name)))
    ).sort()

    const rawTag = Array.isArray(searchParams?.tag)
        ? searchParams!.tag.join(',')
        : (searchParams?.tag ?? '')
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
        <main className="min-h-screen">
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        name: `${NAME} | blog`,
                        url: BLOG_URL,
                        author: {
                            '@type': 'Person',
                            name: FULL_NAME,
                            alternateName: NAME,
                            jobTitle: ROLE,
                            image: `${BLOG_URL}${IMAGE}`,
                            sameAs: [
                                `https://twitter.com/${TWITTER}`,
                                `https://github.com/${GITHUB}`,
                                `https://linkedin.com/in/${LINKEDIN}`,
                            ],
                        },
                        description: `Notes on backend systems, distributed systems, and shipping things ${FULL_NAME} builds.`,
                    }),
                }}
            />

            {/* ---- sticky header ---- */}
            <header className="sticky top-0 z-50 border-b border-[var(--rd-border-2)] bg-[var(--rd-bg-sub)] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                <div className="mx-auto w-full max-w-[var(--rd-maxw)] px-[var(--rd-pad)] py-3">
                    <Navbar />
                </div>
            </header>

            {/* ---- header panel ---- */}
            <div
                className="border-b border-[var(--rd-border)]"
                style={{
                    background:
                        'radial-gradient(100% 140% at 0% 0%, var(--rd-accent-bg), transparent 55%), var(--rd-surface-2)',
                }}
            >
                <div className="mx-auto max-w-[var(--rd-maxw)] px-[var(--rd-pad)] pb-12 pt-12">
                    <Eyebrow>hovanhoa · blog</Eyebrow>
                    <h1 className="mt-[18px] max-w-[22ch] text-[clamp(2rem,4.6vw,3.4rem)] font-semibold tracking-[-0.04em] text-[var(--rd-text)]">
                        Writing.
                    </h1>
                    <p className="rd-lead mt-5">
                        Notes on software engineering, distributed systems,
                        and lessons from building things — with the
                        occasional life update in between.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-[family-name:var(--font-mono)] text-xs text-[var(--rd-text-3)]">
                        <span>{allPosts.length} posts</span>
                        <span aria-hidden>·</span>
                        <span>{allTags.length} tags</span>
                    </div>
                    <nav
                        aria-label="filter by tag"
                        className="mt-6 flex flex-wrap gap-2"
                    >
                        {allTags.map((tag) => {
                            const isActive = activeSet.has(tag.toLowerCase())
                            return (
                                <Link
                                    key={tag}
                                    href={toggleTagHref(tag, activeTags)}
                                    className={`rd-chip transition-colors ${
                                        isActive
                                            ? 'border-[var(--rd-accent)] bg-[var(--rd-accent-bg)] text-[var(--rd-accent-ink)]'
                                            : 'hover:border-[var(--rd-accent)] hover:text-[var(--rd-accent-ink)]'
                                    }`}
                                >
                                    #{tag}
                                </Link>
                            )
                        })}
                        {activeTags.length > 0 && (
                            <Link
                                href="/"
                                className="rd-chip hover:border-[var(--rd-accent)] hover:text-[var(--rd-accent-ink)]"
                            >
                                clear all ✕
                            </Link>
                        )}
                    </nav>
                </div>
            </div>

            {/* ---- body ---- */}
            <div className="mx-auto max-w-[var(--rd-maxw)] px-[var(--rd-pad)] pb-[clamp(56px,8vw,96px)] pt-[clamp(28px,4vw,44px)]">
                {postsArr.length > 0 ? (
                    postsArr.map((post) => (
                        <PostTile
                            key={post.id}
                            post={post}
                            activeTags={activeTags}
                        />
                    ))
                ) : (
                    <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--rd-text-3)]">
                        no posts tagged{' '}
                        <span className="text-[var(--rd-accent-ink)]">
                            {activeTags.map((t) => `#${t}`).join(' ')}
                        </span>{' '}
                        yet.
                    </p>
                )}
            </div>

            <Footer />
        </main>
    )
}
