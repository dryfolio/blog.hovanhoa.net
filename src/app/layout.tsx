import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { BLOG_URL, FULL_NAME, IMAGE, NAME, ROLE, TWITTER } from '@/constants'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
    metadataBase: new URL(BLOG_URL),
    title: {
        default: `${NAME} | blog`,
        template: `%s | ${NAME}`,
    },
    description: `${FULL_NAME} - ${ROLE}. Notes on backend systems, distributed systems, and shipping things that stay calm under load.`,
    keywords: [
        FULL_NAME,
        'Hồ Văn Hòa',
        NAME,
        'hovanhoa',
        ROLE,
        'blog',
        'software engineering',
        'tech blog',
        'Vietnam developer',
    ],
    authors: [{ name: FULL_NAME }],
    openGraph: {
        title: `${NAME} | blog`,
        description: `${FULL_NAME} - ${ROLE}. Notes on backend systems, distributed systems, and shipping things that stay calm under load.`,
        url: BLOG_URL,
        siteName: NAME,
        images: [
            {
                url: IMAGE,
                width: 800,
                height: 600,
                alt: FULL_NAME,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    twitter: {
        card: 'summary_large_image',
        title: `${NAME} | blog`,
        description: `${FULL_NAME} - ${ROLE}. Notes on backend systems and distributed systems.`,
        creator: `@${TWITTER}`,
        images: [IMAGE],
    },
    alternates: {
        canonical: BLOG_URL,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            className={`scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`}
        >
            <body className={GeistSans.className}>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var m=document.cookie.match(/(?:^|; )theme=(dark|light)/);if(m&&m[1]==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
                    }}
                />
                {children}
            </body>
            <Analytics />
        </html>
    )
}
