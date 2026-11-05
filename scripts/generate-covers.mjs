// Generates a dreamy cover image for every post that doesn't set its own
// `coverImage`: pastel skies, haze, cloud banks, glowing suns, iridescent
// bubbles, bokeh and sparkles, drawn on a canvas inside headless Chrome (no
// npm deps). Each post gets its own palette and layout, seeded by its slug,
// so re-running produces the same images.
//
//   node scripts/generate-covers.mjs [slug ...]
//
// Output: public/covers/<slug>.webp (1600×900)

import { spawn } from 'node:child_process'
import {
    mkdirSync,
    readdirSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME =
    process.env.CHROME ||
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const ROOT = join(import.meta.dirname, '..')
const POSTS = join(ROOT, 'content', 'posts')
const OUT = join(ROOT, 'public', 'covers')

// [sky top, sky middle, horizon, bloom accent, light]
const PALETTES = [
    ['#7f8fe8', '#c7a6ef', '#ffc4d6', '#ff9cbf', '#fff1e8'], // lavender dusk
    ['#f59a8b', '#ffb8b0', '#ffe0d2', '#b9a4f5', '#fff6e8'], // peach sunrise
    ['#6fc3d6', '#b9b6f5', '#fdd6ea', '#8ee0c8', '#f4fffb'], // mint haze
    ['#86b7f5', '#f5a8cf', '#ffe1ec', '#c39be8', '#fff6fa'], // cotton candy
    ['#f2a46e', '#ff9e9a', '#f6c9ef', '#ffd27a', '#fff8ec'], // golden hour
    ['#5d9cec', '#a7a3f7', '#ffc8e6', '#86def0', '#f2faff'], // ocean dream
]

// runs inside the page — keep it self-contained
function paint({ seed, palette, w, h }) {
    let s = seed
    const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647
    const between = (a, b) => a + (b - a) * rnd()
    const [top, mid, horizon, accent, light] = palette
    const rgba = (hex, a) => {
        const n = parseInt(hex.slice(1), 16)
        return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`
    }

    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')

    // sky
    const sky = ctx.createLinearGradient(0, 0, w * 0.25, h)
    sky.addColorStop(0, top)
    sky.addColorStop(0.55, mid)
    sky.addColorStop(1, horizon)
    ctx.fillStyle = sky
    ctx.fillRect(0, 0, w, h)

    // large soft colour blooms drifting through the sky
    ctx.save()
    ctx.filter = 'blur(70px)'
    ctx.globalCompositeOperation = 'soft-light'
    for (let i = 0; i < 6; i++) {
        const x = between(-0.1, 1.1) * w
        const y = between(-0.1, 0.8) * h
        const r = between(0.25, 0.5) * w
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        const c = [accent, light, top, horizon][i % 4]
        g.addColorStop(0, rgba(c, 0.9))
        g.addColorStop(1, rgba(c, 0))
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
    }
    ctx.restore()

    // the sun: a wide glow, then a soft bright disc
    const sx = between(0.18, 0.82) * w
    const sy = between(0.18, 0.42) * h
    const sr = between(0.045, 0.07) * h
    ctx.save()
    ctx.globalCompositeOperation = 'screen'
    let g = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr * 6)
    g.addColorStop(0, rgba(light, 0.95))
    g.addColorStop(0.25, rgba(accent, 0.35))
    g.addColorStop(1, rgba(accent, 0))
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    ctx.filter = 'blur(6px)'
    ctx.fillStyle = rgba(light, 0.95)
    ctx.beginPath()
    ctx.arc(sx, sy, sr, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // light rays fanning out from the sun
    ctx.save()
    ctx.globalCompositeOperation = 'screen'
    ctx.filter = 'blur(18px)'
    for (let i = 0; i < 7; i++) {
        const a = between(0.2, Math.PI - 0.2)
        const spread = between(0.03, 0.07)
        const len = w * 1.2
        ctx.fillStyle = rgba(light, between(0.08, 0.18))
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(
            sx + Math.cos(a - spread) * len,
            sy + Math.sin(a - spread) * len
        )
        ctx.lineTo(
            sx + Math.cos(a + spread) * len,
            sy + Math.sin(a + spread) * len
        )
        ctx.closePath()
        ctx.fill()
    }
    ctx.restore()

    // cumulus clouds: a shaded underside, then sunlit puffs on top
    const shade = rgba(top, 0.55)
    const cloud = (cx, cy, size, flatten) => {
        const puffs = []
        const n = 5 + Math.floor(rnd() * 4)
        for (let i = 0; i < n; i++) {
            const t = i / (n - 1) - 0.5
            const r =
                size *
                (0.55 + 0.45 * Math.cos(t * Math.PI)) *
                between(0.75, 1.1)
            puffs.push([cx + t * size * 3.2, cy - r * 0.35 * flatten, r])
        }
        ctx.save()
        ctx.filter = 'blur(10px)'
        ctx.fillStyle = shade
        for (const [x, y, r] of puffs) {
            ctx.beginPath()
            ctx.arc(x, y + r * 0.22, r, 0, Math.PI * 2)
            ctx.fill()
        }
        ctx.filter = 'blur(7px)'
        for (const [x, y, r] of puffs) {
            const lit = ctx.createRadialGradient(
                x - r * 0.3,
                y - r * 0.45,
                r * 0.1,
                x,
                y,
                r
            )
            lit.addColorStop(0, rgba(light, 1))
            lit.addColorStop(0.65, rgba(light, 0.92))
            lit.addColorStop(1, rgba(horizon, 0.7))
            ctx.fillStyle = lit
            ctx.beginPath()
            ctx.arc(x, y - r * 0.05, r * 0.9, 0, Math.PI * 2)
            ctx.fill()
        }
        ctx.restore()
    }
    // a far, hazy row, then bigger clouds closer to the viewer
    for (let i = 0; i < 5; i++)
        cloud(
            between(0, 1) * w,
            between(0.56, 0.66) * h,
            between(0.035, 0.06) * w,
            0.9
        )
    for (let i = 0; i < 3; i++)
        cloud(
            between(0.05, 0.95) * w,
            between(0.72, 0.84) * h,
            between(0.07, 0.1) * w,
            1
        )
    cloud(between(0.2, 0.8) * w, 1.02 * h, 0.14 * w, 1)

    // iridescent bubbles floating in front
    const bubble = (x, y, r) => {
        ctx.save()
        const body = ctx.createRadialGradient(
            x - r * 0.3,
            y - r * 0.35,
            r * 0.1,
            x,
            y,
            r
        )
        body.addColorStop(0, rgba(light, 0.35))
        body.addColorStop(0.6, rgba(accent, 0.12))
        body.addColorStop(0.88, rgba(top, 0.35))
        body.addColorStop(1, rgba(light, 0.75))
        ctx.fillStyle = body
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
        // the thin film's colour sheen along one edge
        ctx.globalCompositeOperation = 'screen'
        const sheen = ctx.createLinearGradient(x - r, y + r, x + r, y - r)
        sheen.addColorStop(0, rgba('#b8f0ff', 0.0))
        sheen.addColorStop(0.45, rgba('#ffb8e6', 0.28))
        sheen.addColorStop(0.7, rgba('#fff2a8', 0.22))
        sheen.addColorStop(1, rgba('#b8f0ff', 0.0))
        ctx.fillStyle = sheen
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
        // specular highlight
        ctx.filter = 'blur(2px)'
        ctx.fillStyle = 'rgba(255,255,255,0.85)'
        ctx.beginPath()
        ctx.ellipse(
            x - r * 0.38,
            y - r * 0.42,
            r * 0.22,
            r * 0.12,
            -0.6,
            0,
            Math.PI * 2
        )
        ctx.fill()
        ctx.restore()
    }
    const bubbles = 2 + Math.floor(rnd() * 3)
    for (let i = 0; i < bubbles; i++)
        bubble(
            between(0.08, 0.92) * w,
            between(0.15, 0.7) * h,
            between(0.03, 0.11) * h * 1.6
        )

    // bokeh drifting through the haze
    ctx.save()
    ctx.globalCompositeOperation = 'screen'
    for (let i = 0; i < 34; i++) {
        const r = between(4, 34)
        ctx.filter = `blur(${between(1, 7)}px)`
        ctx.fillStyle = rgba(i % 3 ? light : accent, between(0.12, 0.4))
        ctx.beginPath()
        ctx.arc(between(0, w), between(0, h * 0.85), r, 0, Math.PI * 2)
        ctx.fill()
    }
    ctx.restore()

    // four-point sparkles
    const sparkle = (x, y, r) => {
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 2.4)
        glow.addColorStop(0, 'rgba(255,255,255,0.55)')
        glow.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = glow
        ctx.fillRect(x - r * 3, y - r * 3, r * 6, r * 6)
        ctx.fillStyle = 'rgba(255,255,255,0.95)'
        ctx.beginPath()
        ctx.moveTo(x, y - r)
        ctx.quadraticCurveTo(x, y, x + r, y)
        ctx.quadraticCurveTo(x, y, x, y + r)
        ctx.quadraticCurveTo(x, y, x - r, y)
        ctx.quadraticCurveTo(x, y, x, y - r)
        ctx.fill()
        ctx.restore()
    }
    for (let i = 0; i < 9; i++)
        sparkle(between(0.05, 0.95) * w, between(0.05, 0.6) * h, between(7, 22))

    // a milky haze over everything, brightest toward the sun
    ctx.save()
    const haze = ctx.createRadialGradient(sx, sy, 0, sx, sy, w)
    haze.addColorStop(0, 'rgba(255,255,255,0.1)')
    haze.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = haze
    ctx.fillRect(0, 0, w, h)
    ctx.restore()

    // film grain
    const img = ctx.getImageData(0, 0, w, h)
    for (let p = 0; p < img.data.length; p += 4) {
        const n = (rnd() - 0.5) * 9
        img.data[p] += n
        img.data[p + 1] += n
        img.data[p + 2] += n
    }
    ctx.putImageData(img, 0, 0)
    return canvas.toDataURL('image/webp', 0.88)
}

const hash = (text) => {
    let x = 2166136261
    for (const ch of text) x = Math.imul(x ^ ch.charCodeAt(0), 16777619)
    return Math.abs(x)
}

// posts that already set a coverImage keep it
const slugs = readdirSync(POSTS)
    .filter((f) => f.endsWith('.md'))
    .filter(
        (f) => !/^coverImage:\s*\S/m.test(readFileSync(join(POSTS, f), 'utf8'))
    )
    .map((f) => f.replace(/\.md$/, ''))
const only = process.argv.slice(2)
const todo = only.length ? slugs.filter((s) => only.includes(s)) : slugs

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const port = 9400 + Math.floor(Math.random() * 400)
const profile = join(tmpdir(), `blog-covers-${port}`)
const proc = spawn(
    CHROME,
    [
        '--headless=new',
        '--disable-gpu',
        `--remote-debugging-port=${port}`,
        `--user-data-dir=${profile}`,
        'about:blank',
    ],
    { stdio: 'ignore' }
)
try {
    let targets
    for (let i = 0; i < 40 && !targets; i++) {
        try {
            targets = await (
                await fetch(`http://127.0.0.1:${port}/json`)
            ).json()
        } catch {
            await sleep(250)
        }
    }
    const ws = new WebSocket(
        targets.find((t) => t.type === 'page').webSocketDebuggerUrl
    )
    await new Promise((r) => (ws.onopen = r))
    let id = 0
    const pending = new Map()
    ws.onmessage = (m) => {
        const d = JSON.parse(m.data)
        if (d.id && pending.has(d.id)) {
            pending.get(d.id)(d)
            pending.delete(d.id)
        }
    }
    const evaluate = (expression) =>
        new Promise((resolve, reject) => {
            const i = ++id
            pending.set(i, (d) =>
                d.result?.exceptionDetails || d.error
                    ? reject(
                          new Error(
                              JSON.stringify(
                                  d.result?.exceptionDetails ?? d.error
                              )
                          )
                      )
                    : resolve(d.result.result.value)
            )
            ws.send(
                JSON.stringify({
                    id: i,
                    method: 'Runtime.evaluate',
                    params: { expression, returnByValue: true },
                })
            )
        })

    mkdirSync(OUT, { recursive: true })
    for (const slug of todo) {
        const seed = (hash(slug) % 2147483646) + 1
        const palette = PALETTES[hash(slug + '#palette') % PALETTES.length]
        const args = JSON.stringify({ seed, palette, w: 1600, h: 900 })
        const url = await evaluate(`(${paint.toString()})(${args})`)
        writeFileSync(
            join(OUT, `${slug}.webp`),
            Buffer.from(url.split(',')[1], 'base64')
        )
        console.log(`✓ ${slug}`)
    }
    ws.close()
} finally {
    const exited = new Promise((r) => proc.once('exit', r))
    proc.kill()
    await exited
    rmSync(profile, { recursive: true, force: true, maxRetries: 5 })
}
