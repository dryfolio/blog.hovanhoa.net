'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import Lightbox, { type Zoomed } from '@/components/lightbox'

// The post cover, opening the original file (not the resized next/image
// variant) in the same lightbox as body images.
export default function CoverImage({ src, alt }: { src: string; alt: string }) {
    const [zoomed, setZoomed] = useState<Zoomed | null>(null)

    return (
        <>
            <button
                type="button"
                className="relative block aspect-[16/9] w-full cursor-zoom-in overflow-hidden rounded-[var(--rd-r-lg)] border border-[var(--rd-border)] bg-[var(--rd-surface-2)] p-0"
                aria-label="Open cover image"
                onClick={() => setZoomed({ src, alt })}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority
                    sizes="(min-width: 1120px) 1008px, 100vw"
                    className="object-cover"
                />
            </button>
            <Lightbox image={zoomed} onClose={() => setZoomed(null)} />
        </>
    )
}
