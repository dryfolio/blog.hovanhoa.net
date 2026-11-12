import fs from 'fs'
import path from 'path'
import { ImageResponse } from '@vercel/og'
import { NAME } from '@/constants'
import { Posts } from '@/lib/posts'

// One OG image per post, rendered at build time to /og/<slug>/image.png
// so the site can be exported as static files.
export const dynamic = 'force-static'

export function generateStaticParams() {
    return Posts.getAllSlugs().map((slug) => ({ slug }))
}

export async function GET(
    _request: Request,
    { params }: { params: { slug: string } }
) {
    const post = Posts.getArticleBySlug(params.slug)
    const title = post ? `${NAME} | ${post.title.toLowerCase()}` : NAME
    const bgImage = fs.readFileSync(
        path.join(process.cwd(), 'public', 'og-bg.jpg')
    )
    const bgImageUrl = `data:image/jpeg;base64,${bgImage.toString('base64')}`

    return new ImageResponse(
        <div
            style={{
                background: '#FFFFFF',
                width: 800,
                height: 418,
                display: 'flex',
                position: 'relative',
                borderRadius: 20,
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={bgImageUrl}
                alt="Background"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: 20,
                }}
            />
            <div
                style={{
                    position: 'relative',
                    marginLeft: 100,
                    marginRight: 50,
                    marginTop: 100,
                    display: 'flex',
                    fontWeight: 600,
                    fontSize: 32,
                    letterSpacing: -0.02,
                    color: '#2D3748',
                    zIndex: 1,
                    lineHeight: 1.4,
                    fontFamily: 'system-ui',
                }}
            >
                {title}
            </div>
        </div>,
        {
            width: 800,
            height: 418,
        }
    )
}
