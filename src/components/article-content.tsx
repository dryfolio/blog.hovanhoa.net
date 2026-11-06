'use client'

import React, { memo, useCallback, useState } from 'react'
import Lightbox, { type Zoomed } from '@/components/lightbox'

interface ArticleContentProps {
    content: string
}

// Memoized so lightbox state changes never re-render (and so reset) the
// post HTML underneath it.
const Body = memo(function Body({
    html,
    onClick,
}: {
    html: string
    onClick: (e: React.MouseEvent) => void
}) {
    return (
        <article
            className="rd-prose prose max-w-none"
            onClick={onClick}
            dangerouslySetInnerHTML={{ __html: html }}
        ></article>
    )
})

export default function ArticleContent({ content }: ArticleContentProps) {
    const [zoomed, setZoomed] = useState<Zoomed | null>(null)

    // Code blocks arrive pre-highlighted from the server (src/lib/highlight.ts);
    // the client only wires up their copy buttons and the image lightbox,
    // both by delegation on the article.
    const onClick = useCallback(async (e: React.MouseEvent) => {
        const target = e.target as HTMLElement

        // An image that is already a link keeps its link.
        if (target instanceof HTMLImageElement && !target.closest('a')) {
            setZoomed({
                src: target.currentSrc || target.src,
                alt: target.alt,
            })
            return
        }

        const button = target.closest<HTMLButtonElement>('[data-copy]')
        const code = button?.closest('figure')?.querySelector('pre code')
        if (!button || !code) return

        try {
            await navigator.clipboard.writeText(code.textContent ?? '')
            button.textContent = 'copied'
            button.dataset.state = 'copied'
        } catch {
            button.textContent = 'failed'
        }
        window.setTimeout(() => {
            button.textContent = 'copy'
            delete button.dataset.state
        }, 1600)
    }, [])

    return (
        <>
            <Body html={content} onClick={onClick} />
            <Lightbox image={zoomed} onClose={() => setZoomed(null)} />
        </>
    )
}
