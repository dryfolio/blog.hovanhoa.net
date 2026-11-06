'use client'

import React, { useEffect, useRef } from 'react'

export type Zoomed = { src: string; alt: string }

// Full-size image in a native <dialog>; Esc, the close button, or a click
// anywhere dismisses it.
export default function Lightbox({
    image,
    onClose,
}: {
    image: Zoomed | null
    onClose: () => void
}) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (image && dialog && !dialog.open) dialog.showModal()
    }, [image])

    return (
        <dialog
            ref={dialogRef}
            className="rd-lightbox"
            aria-label={image?.alt || 'Image'}
            onClick={() => dialogRef.current?.close()}
            onClose={onClose}
        >
            {image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image.src} alt={image.alt} />
            )}
            <button
                type="button"
                className="rd-lightbox-close"
                aria-label="Close image"
            >
                esc
            </button>
        </dialog>
    )
}
