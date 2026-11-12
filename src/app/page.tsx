import { Suspense } from 'react'
import { BlogIndex, BlogIndexFromUrl } from '@/app/blog-index'
import { Posts } from '@/lib/posts'
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

// The ?tag= filter is applied in the browser so the page can be exported
// as static HTML; without JS (or before hydration) the full list renders.
export default function BlogHome() {
    const allPosts: PostExcerpt[] = Posts.getAllSummaries()
    const allTags = Array.from(
        new Set(allPosts.flatMap((p) => p.tags.map((t) => t.name)))
    ).sort()

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

            <Suspense
                fallback={
                    <BlogIndex
                        allPosts={allPosts}
                        allTags={allTags}
                        rawTag=""
                    />
                }
            >
                <BlogIndexFromUrl allPosts={allPosts} allTags={allTags} />
            </Suspense>
        </main>
    )
}
