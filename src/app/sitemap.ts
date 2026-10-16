import { MetadataRoute } from 'next'
import { Posts } from '@/lib/posts'
import { BLOG_URL } from '@/constants'

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = Posts.getAllSummaries().map((post) => ({
        url: `${BLOG_URL}/${post.slug}`,
        lastModified: post.updatedAt ?? post.publishedAt,
    }))

    return [{ url: BLOG_URL, lastModified: new Date() }, ...posts]
}
