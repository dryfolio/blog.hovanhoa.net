'use client'

import React, { useCallback } from 'react'

interface ArticleContentProps {
    content: string
}

export default function ArticleContent({ content }: ArticleContentProps) {
    // Code blocks arrive pre-highlighted from the server (src/lib/highlight.ts);
    // the only client work left is their copy buttons, handled by delegation.
    const onClick = useCallback(async (e: React.MouseEvent) => {
        const button = (e.target as HTMLElement).closest<HTMLButtonElement>(
            '[data-copy]'
        )
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
        <article
            className="rd-prose prose max-w-none"
            onClick={onClick}
            dangerouslySetInnerHTML={{
                __html: content,
            }}
        ></article>
    )
}
