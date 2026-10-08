# Youth GEO Japan promo video

A 26.5-second bilingual (JA/EN) promo for Youth GEO Japan. Every pixel and every note is generated from code in [`source/`](source/), so the video can be edited and re-rendered on any machine. Nothing in it comes from a video editor or uses licensed music or stock footage.

**The MP4s aren't committed** (~50 MB each, git-ignored). Render them from source:

```bash
cd promo/source
npm install
npm run render
```

This writes both files into `promo/` in about 6 minutes. See [Requirements](#requirements-and-gotchas) for what the machine needs.

| File | Format | Use |
| --- | --- | --- |
| `ygj-promo-vertical-1080x1920.mp4` *(generated)* | 9:16, 30fps, H.264 + AAC, ~50 MB | Instagram Reels, TikTok, YouTube Shorts |
| `ygj-promo-landscape-1920x1080.mp4` *(generated)* | 16:9, 30fps, H.264 + AAC, ~50 MB | YouTube, event screens, website |
| [`storyboard/storyboard-vertical.jpg`](storyboard/storyboard-vertical.jpg) | Contact sheet of keyframes | Quick visual reference for the cut |
| [`storyboard/storyboard-landscape.jpg`](storyboard/storyboard-landscape.jpg) | Contact sheet of keyframes | Landscape layout reference |

The website build doesn't use this folder. `promo/**` is in the eslint ignores, and the MP4s aren't under `public/`.

---

## How it was made

```
source/index.html ── canvas animation; window.render(t) draws the frame at time t (seconds)
source/music.js   ── synthesizes music.wav (120 BPM) sample-by-sample, no samples/libraries
source/render.js  ── headless Chrome (puppeteer-core) calls render(f/30) for each frame,
                     pipes PNGs into ffmpeg, muxes music.wav → MP4
```

1. **Animation (`index.html`).** This is one HTML page with one `<canvas>`. Width and height come from `?w=&h=`, so the same code renders portrait and landscape. Rendering is a **pure function of time**: `window.render(t)` draws exactly one frame, and random-looking effects (grain, shake) use a seed taken from the frame number. That makes rendering deterministic and lets you preview any moment. Open `index.html?w=1080&h=1920&t=9.2` in a browser to see the frame at 9.2s.
2. **Music (`music.js`).** A small software synth (kick, clap, hats, saw bass, detuned "supersaw" stabs, pad, noise riser, impact, dotted-8th delay) writes a 16-bit stereo 44.1 kHz WAV. Chords are Am–F–C–G. It uses a seeded random generator, so it's deterministic too.
3. **Rendering (`render.js`).** It loads the page in headless Chrome, waits for web fonts, then for each frame runs `render(t)`, reads `canvas.toDataURL("image/png")`, and writes it to ffmpeg's stdin (`image2pipe`). Encoding is libx264 `-crf 17 -preset slow`, yuv420p, AAC 192k, `+faststart`. Rendering runs at about 5 fps, so each video takes roughly 3 minutes.

### Sync contract (important when editing)

- **120 BPM → 1 beat = 0.5 s = 15 frames.** Every cut and text hit in `index.html` is on the beat grid. In `music.js`, everything is scheduled in **beats** (`b`), where `t = b × 0.5`.
- If you move a scene boundary in `index.html`, move the matching section in `music.js` too, and the reverse. The section map is in the storyboard below.
- Total duration is set in **three** places, which must match: `DUR` in `render.js`, `DUR` in `music.js`, and the last scene's fade-out in `scene6` (`prog(lt, 6.0, 6.5)` → ends at 26.5s).

---

## Storyboard

Times are seconds, with beats (b) in brackets. All copy comes from `lib/site-content.ts` / `lib/i18n.ts` unless marked *(video-only)*.

| # | Time | Function in `index.html` | Visual | Copy (JA / EN) | Audio (`music.js`) |
| --- | --- | --- | --- | --- | --- |
| 1 | 0.0–4.0 (b0–8) | `scene1` | Dark bg (`C.dark`), topo contours reveal radially; a blue street grid fades in at 1s; a green map pin drops at 2s; at 3.5s **地理。** slams in (scale 1.6→1, white flash, camera shake) | 地形を眺める。/ READ THE LANDSCAPE · 街を想像する。/ IMAGINE HOW CITIES GREW · 地図アプリを開く。/ OPEN A MAP APP · それ、ぜんぶ / ALL OF IT IS · **地理。/ GEOGRAPHY.** (paraphrased from the site's "Our story") | Kick + filtered stab every 2 beats, hats from b4, riser b4–8, fill at b7 |
| 2 | 4.0–6.0 (b8–12) | `scene2` | Cream bg; dark diagonal wipe out; hub: 地理 centre node with a pulse ring, 6 coloured nodes fly out on dashed spokes and the ring rotates | 地理は、分野をつなぐハブ。/ GEOGRAPHY IS A HUB BETWEEN FIELDS (from Story). Nodes *(video-only labels)*: 防災 RESILIENCE, 都市 CITIES, 環境 ENVIRONMENT, 交通 MOBILITY, 観光 TOURISM, データ DATA | Full groove drops at b8 |
| 3 | 6.0–14.0 (b12–28) | `scene3` + `motif(i)`, data in `pillars` | Four 2-second cards. Each opens with a full-screen colour wipe at the **logo arrow's angle** (`ANG`). It shows `0N — 04`, a giant JA word, an italic EN word, a rule, and a subtitle. Motifs: ripples (知る), rotating compass rings (考える), rising 3D bars (形にする), node network (繋がる) | 知る DISCOVER 「きっかけ」を届ける · 考える THINK 「視点」を広げる · 形にする CREATE 「体験」を生み出す · 繋がる CONNECT 「環境」を育む. Colours: blue, green, yellow, brown | Groove + syncopated chord stabs |
| 4 | 14.0–17.0 (b28–34) | `scene4`, data in `acts` | Dark bg, fast-zooming contours; "WHAT WE DO" with a 6-step progress bar; one stadium-shaped (logo pill) plate per beat, punching in | 勉強会 STUDY SESSIONS · LT会 LIGHTNING TALKS · フィールドワーク FIELDWORK · コンテスト COMPETITIONS · 交流会 MEETUPS · 就職相談 CAREER TALKS (from `activityCategories` + the August newsletter) | Groove continues |
| 4b | 17.0–18.0 (b34–36) | `scene4` (`lt >= 3` branch) | Stacked coloured lines | 学部も、専門も、スキルも、問わない。/ ANY MAJOR. ANY FIELD. ANY SKILL LEVEL. (from Community) | Groove |
| 5 | 18.0–20.0 (b36–40) | `scene5` | Cream bg; slow zoom-in plus growing shake; marker-highlight swipes under each quote; whites out at the end | 「地理が好き」I LOVE GEOGRAPHY · 「GISに興味がある」I'M CURIOUS ABOUT GIS · 「仲間と形にしたい」I WANT TO BUILD WITH OTHERS · その気持ちがあれば、 (condensed from the Community section) | Drums thin out, snare roll accelerates, big riser |
| 6 | 20.0–26.5 (b40–53) | `scene6` + `logo()` | White flash → **the logo assembles from vectors**: the stadium pops, 4 colour regions grow from the line intersection, the horizon bar wipes in, the arrow shoots in from bottom-left with speed streaks. Then YOUTH GEO JAPAN (per-letter), the tagline, a green JOIN US pill, the URL. It fades to cream at 26.0–26.5 | YOUTH GEO JAPAN · 好奇心を、まっすぐ未来へ。· Curiosity, straight into the future. · JOIN US → · youthgeojp.com | Impact + sub-boom at b40, C-major pad, fading arpeggio, soft kicks b44–49, master fade |

Camera shake hits are listed in `shake()` (3.5s, 4.0s, 20.0s).

---

## Design system (top of `index.html`)

- **Colours `C`.** These match `lib/site-colors.ts`: `bg #F7F3ED`, `ink #3e3a39`, `blue #a9dbee`, `green #6bbc70`, `yellow #f8d478`, `brown #6A5748`, `soft #e7eef3`, plus the video-only `dark #211e1d`.
- **Fonts.** JA: Noto Sans JP 700/900. EN: Inter Tight 600/800/900, with italics. Labels: JetBrains Mono 700. All come from Google Fonts and **need internet at render time**. If they fail, `render.js` prints a warning and Chrome falls back to Yu Gothic / Segoe UI / Consolas.
- **Units.** `u = min(W,H)/1080`, so sizes are written for 1080 px and scale. `PORTRAIT` switches layout positions for 16:9 (for example, scene 2 puts the hub on the right and scene 3 uses fewer bars).
- **Motifs.** Topographic contours come from `topo`, precomputed with marching squares over a seeded blob field. The pill/stadium shape comes from the logo. Wipes run at the logo arrow angle `ANG`.

### Helper cheat-sheet

| Helper | What it does |
| --- | --- |
| `prog(t, a, b)` | 0→1 progress of `t` between `a` and `b` (clamped). This is the core timing primitive. |
| `eOutExpo`, `eOutBack`, `eInOut`, `eOutCubic`, `eInCubic` | Easing curves |
| `reveal(str, x, y, size, pin, pout, opts)` | Masked slide-up text in/out. `pin`/`pout` are 0→1 progress values. |
| `revealChars(...)` | Per-character staggered `reveal` |
| `txt(str, x, y, size, {fam, weight, color, align, alpha, track, italic})` | Plain text. `track` = letter-spacing as a fraction of size. |
| `fit(str, maxW, size, fam, weight)` | Shrinks the font size so `str` fits `maxW` |
| `diagWipe(p, color)` | Full-screen wipe along the arrow angle |
| `drawTopo(color, alpha, radiusP, zoom, rot, lineWidth)` | Contour background |
| `stadium(cx, cy, w, h)` | Pill path (call `fill()` after) |
| `logo(cx, cy, scale, t0, t)` | Animated vector logo, drawn in the 640×640 coordinate space of `public/YGJ-logo-only.png` |

---

## Editing recipes

Quick setup on a new machine:

```bash
cd promo/source
npm install
node music.js
```

- **Change text.** Edit the strings in the relevant `sceneN` or in the data arrays (`hubNodes`, `pillars`, `acts`). Keep JA and EN aligned with the site (see `docs/seo-aio-guide.md` for tone). Long strings are usually wrapped in `fit()`; if not, wrap them.
- **Preview a frame quickly.** Open `source/index.html?w=1080&h=1920&t=12.3` in Chrome, or render stills: `node render.js stills 1080 1920 12.3 18.5` → `source/stills/`. To check every scene at once, run `npm run stills` (vertical) and `npm run stills:landscape`. **Always check both aspect ratios.** Landscape is where overlaps tend to appear.
- **Retime a scene.** Scene boundaries are the `if (t < …)` chain in `window.render`. Each scene uses local time `lt = t - start`. Keep boundaries on multiples of 0.5s, and move the matching beats in `music.js` (comments mark each section as `b0-8`, `b8-36`, `b36-40`, `b40+`).
- **Lengthen or shorten the video.** Update `DUR` in `render.js` and `music.js` and the fade in `scene6`.
- **Add a scene.** Write `sceneX(t)`, add it to the chain in `window.render`, shift the later scenes, and add music for it.
- **Swap in real music.** Replace `music.wav` with any WAV/MP3 (and adjust the input name in `render.js`). If the BPM isn't 120, retime the scenes.
- **Change colours or fonts.** Edit `C`, `JP`/`EN`/`MONO`, and the Google Fonts `<link>`. New weights must also be added to the `document.fonts.load` list in `window.ready`.
- **Render the finals.** Run `npm run render`, which regenerates the music and then writes both MP4s into `promo/` (~3 min each). Use `npm run render:vertical` or `npm run render:landscape` for one at a time.
- **Make smaller files** (for example, for upload limits):

```bash
ffmpeg -i ygj-promo-vertical-1080x1920.mp4 -c:v libx264 -crf 23 -preset slow -c:a copy ygj-promo-vertical-small.mp4
```

  Most of the bitrate goes on the film grain; lowering the `0.07` alpha in `drawGrain` also shrinks files.

---

## Requirements and gotchas

- **Node 18+**, **ffmpeg** on PATH (Windows: `winget install Gyan.FFmpeg`; macOS: `brew install ffmpeg`), and a Chromium browser. `render.js` auto-detects Chrome or Edge on Windows, macOS and Linux; otherwise set `CHROME_PATH=/path/to/chrome`.
- **Internet is needed** while rendering, for Google Fonts.
- **Japanese font subsets.** Google serves Noto Sans JP in many unicode-range chunks, so loading a single sample character isn't enough. `window.ready` loads every character that appears in the script (`ALL`). If you add text that's built at runtime from outside the script, include those characters too.
- Generated files are git-ignored (`promo/.gitignore`): all `*.mp4` renders, `source/node_modules/`, `source/stills/`, `source/music.wav`. To share the final videos, upload them somewhere (for example, Google Drive or YouTube) rather than committing them.
- Copy accuracy: before publishing an edited cut, check that activity names and claims still match `lib/site-content.ts`. For example, only list activities the community actually runs.

## History

- 2026-10-07: v1 created with Claude Code. Six scenes, 120 BPM synthesized track, vertical and landscape renders.
