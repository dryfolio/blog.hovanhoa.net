import 'server-only'

import Prism from 'prismjs'
// Order matters: a grammar must load after the ones it extends.
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-nginx'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-diff'
import 'prismjs/components/prism-markdown'

const ALIASES: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    sh: 'bash',
    shell: 'bash',
    zsh: 'bash',
    console: 'bash',
    golang: 'go',
    py: 'python',
    yml: 'yaml',
    dockerfile: 'docker',
    md: 'markdown',
}

// Short, lowercase names for the block header.
const LABELS: Record<string, string> = {
    javascript: 'js',
    typescript: 'ts',
    markdown: 'md',
    docker: 'dockerfile',
}

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
}

/** Renders a fenced code block as a framed figure: a header with the
 *  language and a copy button (wired up in ArticleContent), then the
 *  Prism-highlighted body. Highlighting happens at build time, so the
 *  page ships no highlighter and never flashes unstyled code. */
export function renderCodeBlock(code: string, rawLang?: string): string {
    const requested = (rawLang ?? '').trim().split(/\s+/)[0].toLowerCase()
    const lang = ALIASES[requested] ?? requested
    const grammar = lang ? Prism.languages[lang] : undefined
    const body = grammar
        ? Prism.highlight(code, grammar, lang)
        : escapeHtml(code)
    const cls = grammar ? `language-${lang}` : 'language-none'
    const label = escapeHtml(LABELS[lang] ?? (lang || 'text'))

    return (
        `<figure class="rd-code not-prose">` +
        `<figcaption class="rd-code-head">` +
        `<span class="rd-code-lang">${label}</span>` +
        `<button type="button" class="rd-code-copy" data-copy aria-label="Copy code">copy</button>` +
        `</figcaption>` +
        `<pre class="${cls}"><code class="${cls}">${body}</code></pre>` +
        `</figure>\n`
    )
}
