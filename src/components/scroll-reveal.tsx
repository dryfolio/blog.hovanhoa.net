'use client'

import { useEffect } from 'react'

// Post body blocks plus anything explicitly marked with data-reveal.
const SELECTOR = '[data-reveal], .rd-prose > *'

/** Fades blocks up once as they scroll into view. Anything already on
 *  screen when first seen is left alone (the page's own .rd-rise entrance
 *  covers it), so nothing visible ever blinks out. Mounted once in the
 *  root layout; a MutationObserver picks up content from client-side
 *  navigations. */
export default function ScrollReveal() {
    useEffect(() => {
        if (
            !('IntersectionObserver' in window) ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        )
            return

        const seen = new WeakSet<Element>()
        const io = new IntersectionObserver(
            (entries) => {
                let batch = 0
                for (const entry of entries) {
                    const el = entry.target as HTMLElement
                    if (!el.classList.contains('rd-reveal')) {
                        if (entry.boundingClientRect.top < window.innerHeight) {
                            io.unobserve(el)
                        } else {
                            el.classList.add('rd-reveal')
                        }
                        continue
                    }
                    if (!entry.isIntersecting) continue
                    // Blocks arriving together cascade instead of popping at once.
                    el.style.setProperty(
                        '--rd-reveal-delay',
                        `${Math.min(batch++, 5) * 60}ms`
                    )
                    el.classList.add('rd-revealed')
                    io.unobserve(el)
                }
            },
            { threshold: 0.12 }
        )

        const scan = () =>
            document.querySelectorAll(SELECTOR).forEach((el) => {
                if (seen.has(el)) return
                seen.add(el)
                io.observe(el)
            })
        scan()

        let raf = 0
        const mo = new MutationObserver(() => {
            cancelAnimationFrame(raf)
            raf = requestAnimationFrame(scan)
        })
        mo.observe(document.body, { childList: true, subtree: true })

        return () => {
            io.disconnect()
            mo.disconnect()
            cancelAnimationFrame(raf)
        }
    }, [])

    return null
}
