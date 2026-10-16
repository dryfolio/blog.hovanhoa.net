import { Posts } from '@/lib/posts'
import { BLOG_URL, FULL_NAME, NAME, ROLE } from '@/constants'

export async function GET() {
    const posts = Posts.getAllSummaries()

    const lines = [
        `# ${NAME} | blog`,
        '',
        `> ${FULL_NAME} — ${ROLE}. Notes on backend systems, distributed systems, and shipping things that stay calm under load.`,
        '',
        '## Posts',
        '',
        ...posts.map(
            (p) => `- [${p.title}](${BLOG_URL}/${p.slug}): ${p.brief}`
        ),
        '',
    ]

    return new Response(lines.join('\n'), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
}
