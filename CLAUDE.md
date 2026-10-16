# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run ESLint
npm run format        # Format TS and Markdown with Prettier
npm run format-check  # Check formatting without modifying
```

## Architecture

**Next.js 14 personal blog** using the App Router, TypeScript, and Tailwind CSS. Part of the `*.hovanhoa.net` family (same `--rd-*` design system as hovanhoa.net, book.hovanhoa.net, etc. — see `DESIGN.md` in the `hovanhoa.net` repo for the full system).

This repo was split out of `hovanhoa.net` so the blog has its own subdomain, matching the rest of the family. `hovanhoa.net`'s home page fetches `GET /api/feed.json?limit=5` from this site to render its "latest writing" preview — don't break that response shape (`{ total, posts: [{ slug, title, brief, publishedAt, updatedAt, readTimeInMinutes, coverImage, tags: [{ name, category }] }] }`) without updating the consumer there too.

### Data Flow

All blog content lives in `content/posts/<slug>.md` and is parsed by `src/lib/posts.ts`. Frontmatter is parsed with `gray-matter` and the body is converted to HTML with `marked`. The `Posts` module exposes `getArticles`, `getArticleBySlug`, `getAllSlugs`, and `getAllSummaries` for page components. Post images live under `public/posts/<slug>/`.

### Key Directories

- `content/posts/` — Source-of-truth Markdown files for blog posts. Each `.md` has frontmatter (`title`, `brief`, `publishedAt`, `updatedAt`, `tags`, `coverImage`).
- `public/posts/<slug>/` — Static assets (images) referenced by a post's markdown.
- `src/app/` — Next.js App Router pages. `/` is the full post listing (with `?tag=` filtering). `[slug]/page.tsx` is the post detail route, prerendered via `generateStaticParams`. `/api/og` generates OG images; `/api/feed.json` is the JSON feed hovanhoa.net consumes.
- `src/components/` — `post-tile.tsx` (the timeline-rail post row), `article-content.tsx` (Prism syntax highlighting).
- `src/lib/` — `posts.ts` (Markdown loader), `tag-categories.ts` (tag → color-bucket map, **must be kept in sync by hand** whenever a post introduces a new tag), `tag-filter-url.ts` (the `?tag=` toggle logic).

### Styling

Tailwind CSS with the `@tailwindcss/typography` plugin for rendered post content. Prism.js handles client-side syntax highlighting via `article-content.tsx`. Prettier uses 4-space indentation and single quotes.

### Adding a Post

1. Create `content/posts/<slug>.md` with frontmatter (`title`, `brief`, `publishedAt`, `tags`, `coverImage`).
2. Drop any referenced images into `public/posts/<slug>/` and link them from the markdown as `/posts/<slug>/<file>`.
3. If any tag is new, add it to `src/lib/tag-categories.ts`'s `TAG_CATEGORY` map (it silently falls back to `'engineering'` otherwise).
4. The listing page, detail route, sitemap, llms.txt, and `/api/feed.json` all pick the post up automatically — no other wiring needed.

### SEO

- `src/app/sitemap.ts` — dynamic, one entry per post.
- `public/robots.txt` — static, allows everything.
- `src/app/llms.txt/route.ts` — plain-text post index for LLM consumption.
