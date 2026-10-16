# blog.hovanhoa.net

Notes on backend systems, distributed systems, and shipping things that stay calm under load. Part of the `*.hovanhoa.net` family (same design system as [hovanhoa.net](https://hovanhoa.net) and [book.hovanhoa.net](https://book.hovanhoa.net)).

- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + the shared `--rd-*` editorial design tokens (Geist Sans/Mono, orange accent)
- Content: local Markdown files, no CMS
- Deployment: Vercel

hovanhoa.net's home page fetches `GET /api/feed.json?limit=5` from this site to render its "latest writing" preview — see `CLAUDE.md` for the response shape before changing it.

## Running Locally

```bash
npm install
npm run dev
```

## Adding a Post

1. Create `content/posts/<slug>.md` with frontmatter:
   ```yaml
   ---
   title: 'Post title'
   brief: 'One-line summary.'
   publishedAt: '2026-01-01'
   tags:
     - golang
   ---
   ```
2. Drop any images into `public/posts/<slug>/` and reference them as `/posts/<slug>/<file>` from the markdown.
3. If a tag is new, add it to `src/lib/tag-categories.ts`.

## Deployment

1. `vercel link` — link this directory to a new Vercel project.
2. Add `blog.hovanhoa.net` as a custom domain on that project.
3. Point a CNAME for `blog` at the DNS provider for `hovanhoa.net` to Vercel's target.
