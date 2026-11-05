import Image from 'next/image'
import Link from 'next/link'
import { BLOG_URL, NAME, FULL_NAME } from '@/constants'
import formatDate from '@/lib/format-date'
import { type Tag, type Post } from '@/lib/types'
import React from 'react'
import { PostList } from '@/components/post-row'
import { SectionHead, sectionLink } from '@/components/section-head'
import { TagPill } from '@/components/redesign/tag-pill'
import NotFound from '@/app/not-found'
import { Posts } from '@/lib/posts'
import ArticleContent from '@/components/article-content'
import { Metadata } from 'next'

export function generateStaticParams() {
    return Posts.getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string }
}): Promise<Metadata> {
    const post = Posts.getArticleBySlug(params.slug)

    if (!post) {
        return {
            title: 'Not Found',
            description: 'The page you are looking for does not exist.',
        }
    }

    const ogImage =
        (post?.coverImage?.url?.startsWith('http') && post.coverImage.url) ||
        `${BLOG_URL}/api/og?title=${encodeURIComponent(`${NAME} | ${post.title.toLowerCase()}`)}`

    return {
        title: {
            absolute: `${NAME} | ${post.title.toLowerCase()}`,
        },
        description: post.brief,
        keywords: [
            FULL_NAME,
            'Hồ Văn Hòa',
            NAME,
            'hovanhoa',
            post.title,
            ...(post.tags?.map((tag: { name: string }) => tag.name) || []),
        ],
        authors: [{ name: FULL_NAME }],
        openGraph: {
            title: `${NAME} | ${post.title.toLowerCase()}`,
            description: post.brief,
            url: `${BLOG_URL}/${params.slug}`,
            siteName: NAME,
            images: [
                {
                    url: ogImage,
                    width: 800,
                    height: 418,
                    alt: post.title,
                },
            ],
            locale: 'en_US',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${NAME} | ${post.title.toLowerCase()}`,
            description: post.brief,
            creator: '@_hovanhoa_',
            images: [ogImage],
        },
        alternates: {
            canonical: `${BLOG_URL}/${params.slug}`,
        },
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const slug = params.slug
    const post: Post | null = Posts.getArticleBySlug(slug)

    if (!post) {
        return <NotFound />
    }

    const morePosts = Posts.getAllSummaries()
        .filter((p) => p.slug !== slug)
        .slice(0, 3)

    return (
        <>
            <main className="relative min-h-screen">
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'BlogPosting',
                            headline: post.title,
                            datePublished: post.publishedAt,
                            dateModified: post.publishedAt,
                            description: post.brief,
                            image: post.coverImage.url.startsWith('/')
                                ? `${BLOG_URL}${post.coverImage.url}`
                                : post.coverImage.url || undefined,
                            url: `${BLOG_URL}/${slug}`,
                            author: {
                                '@type': 'Person',
                                name: FULL_NAME,
                                alternateName: NAME,
                            },
                        }),
                    }}
                />
                <article className="mx-auto w-full max-w-[var(--rd-maxw)] px-[var(--rd-pad)] pb-[clamp(48px,6vw,80px)] pt-[clamp(2.5rem,6vw,4.5rem)]">
                    <header className="rd-rise max-w-[46rem]">
                        <Link
                            href="/"
                            className={`${sectionLink} mb-[clamp(1.75rem,4vw,2.75rem)]`}
                        >
                            <span aria-hidden>←</span>
                            All posts
                        </Link>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-[family-name:var(--font-mono)] text-[0.72rem] text-[var(--rd-text-3)]">
                            <time dateTime={post.publishedAt}>
                                {formatDate(post.publishedAt)}
                            </time>
                            <span aria-hidden>·</span>
                            <span>{post.readTimeInMinutes} min read</span>
                        </div>
                        <h1 className="m-0 mt-3 text-balance font-[family-name:var(--font-display)] text-[clamp(2.1rem,4.5vw,3.4rem)] font-normal leading-[1.08] tracking-[-0.03em] text-[var(--rd-text)]">
                            {post.title}
                        </h1>
                        {post.brief && (
                            <p className="m-0 mt-4 max-w-[60ch] text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.6] text-[var(--rd-text-2)]">
                                {post.brief}
                            </p>
                        )}
                        {post.tags.length > 0 && (
                            <div className="mt-5 flex flex-wrap gap-1.5">
                                {post.tags.map((tag: Tag) => (
                                    <TagPill key={tag.name} name={tag.name} />
                                ))}
                            </div>
                        )}
                    </header>
                    {post.coverImage.url && (
                        <div className="relative mt-[clamp(1.75rem,3.5vw,2.5rem)] aspect-[16/9] overflow-hidden rounded-[var(--rd-r-lg)] border border-[var(--rd-border)] bg-[var(--rd-surface-2)]">
                            <Image
                                src={post.coverImage.url}
                                alt=""
                                fill
                                priority
                                sizes="(min-width: 1120px) 1008px, 100vw"
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div className="mt-[clamp(2rem,4vw,3rem)] max-w-[68ch] border-t border-[var(--rd-line)] pt-[clamp(1.5rem,3vw,2.25rem)]">
                        <ArticleContent content={post.content.html} />
                    </div>
                </article>
                {morePosts.length > 0 && (
                    <section className="mx-auto max-w-[var(--rd-maxw)] px-[var(--rd-pad)] pb-[clamp(56px,8vw,96px)]">
                        <SectionHead
                            title="Keep reading"
                            links={[{ label: 'All posts', href: '/' }]}
                        />
                        <PostList posts={morePosts} />
                    </section>
                )}
            </main>
        </>
    )
}
