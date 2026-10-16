import { NextResponse } from 'next/server'
import { Posts } from '@/lib/posts'
import { categoryFor } from '@/lib/tag-categories'

// Consumed server-side by hovanhoa.net's home page for its "blog bento"
// preview — see src/app/page.tsx there. Not meant for browser/client fetches.
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit') ?? '5') || 5

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
            coverImage: post.coverImage,
            tags: post.tags.map((tag) => ({
                name: tag.name,
                category: categoryFor(tag.name),
            })),
        })
    )

    return NextResponse.json(
        { total, posts },
        { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' } }
    )
}
