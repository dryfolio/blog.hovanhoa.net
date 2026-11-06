'use client'

import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

interface ArticleContentProps {
    content: string
}

type Zoomed = { src: string; alt: string }

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
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [zoomed, setZoomed] = useState<Zoomed | null>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (zoomed && dialog && !dialog.open) dialog.showModal()
    }, [zoomed])

    const close = useCallback(() => dialogRef.current?.close(), [])

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
            <dialog
                ref={dialogRef}
                className="rd-lightbox"
                aria-label={zoomed?.alt || 'Image'}
                onClick={close}
                onClose={() => setZoomed(null)}
            >
                {zoomed && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={zoomed.src} alt={zoomed.alt} />
                )}
                <button
                    type="button"
                    className="rd-lightbox-close"
                    aria-label="Close image"
                >
                    esc
                </button>
            </dialog>
        </>
    )
}
