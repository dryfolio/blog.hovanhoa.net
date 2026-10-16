// Clicking a tag toggles it in/out of the ?tag= filter on this listing page.
export function toggleTagHref(name: string, activeTags: string[]): string {
    const isActive = activeTags.some(
        (t) => t.toLowerCase() === name.toLowerCase()
    )
    const next = isActive
        ? activeTags.filter((t) => t.toLowerCase() !== name.toLowerCase())
        : [...activeTags, name]
    return next.length ? `/?tag=${next.map(encodeURIComponent).join(',')}` : '/'
}
