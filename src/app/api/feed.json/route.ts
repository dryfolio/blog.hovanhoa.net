import { NextResponse } from 'next/server'
import { Posts } from '@/lib/posts'
import { categoryFor } from '@/lib/tag-categories'
import { BLOG_URL } from '@/constants'

// Consumed server-side by hovanhoa.net's home page for its "blog bento"
// preview — see src/app/page.tsx there. Not meant for browser/client fetches.
// Exported as a static file, so ?limit= is ignored and the latest
// FEED_LIMIT posts are always returned.
export const dynamic = 'force-static'

const FEED_LIMIT = 5

export async function GET() {
    const limit = FEED_LIMIT

    const total = Posts.getAllSlugs().length
    const posts = Posts.getArticles({ page: 1, pageSize: limit }).map(
        (post) => ({
            id: post.slug,
            slug: post.slug,
            url: post.url,
            title: post.title,
            brief: post.brief,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            readTimeInMinutes: post.readTimeInMinutes,
            // absolute, since the consumer renders it from another origin
            coverImage: {
                url: post.coverImage.url.startsWith('/')
                    ? `${BLOG_URL}${post.coverImage.url}`
                    : post.coverImage.url,
            },
            tags: post.tags.map((tag) => ({
                name: tag.name,
                category: categoryFor(tag.name),
            })),
        })
    )

    return NextResponse.json({ total, posts })
}
