// Renders index.html (a canvas animation driven by window.render(t)) to PNG stills or an MP4.
//
//   node render.js stills <w> <h> [t1 t2 ...]   -> stills/<w>x<h>_<t>.png
//   node render.js video  <w> <h> <out.mp4>     -> MP4 (H.264 + AAC, music.wav muxed in)
//
// Needs: Chrome/Chromium/Edge (set CHROME_PATH to override), ffmpeg on PATH,
// music.wav (run `node music.js` first), and internet access for Google Fonts.
const puppeteer = require("puppeteer-core");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const FPS = 30;
const DUR = 26.5; // seconds; keep in sync with music.js DUR and the scene timeline in index.html
const [mode = "stills", W = 1080, H = 1920, ...rest] = process.argv.slice(2);

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates = {
    win32: [
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    ],
    darwin: [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
    ],
    linux: ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/microsoft-edge"],
  }[process.platform] || [];
  const found = candidates.find((p) => fs.existsSync(p));
  if (!found) throw new Error("No Chrome/Edge found. Set CHROME_PATH to a Chromium-based browser executable.");
  return found;
}

(async () => {
  process.chdir(__dirname);
  const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ["--force-device-scale-factor=1"] });
  const page = await browser.newPage();
  await page.setViewport({ width: +W, height: +H });
  page.on("pageerror", (e) => console.log("PAGE ERROR:", e.message));
  await page.goto(pathToFileURL(path.resolve("index.html")).href + `?w=${W}&h=${H}`, { waitUntil: "networkidle0" });
  const fonts = await page.evaluate(() => window.ready);
  if (!/Noto Sans JP/.test(fonts) || !/Inter Tight/.test(fonts)) console.warn("WARNING: web fonts did not load; output will use fallback fonts. Loaded:", fonts);

  const grab = async (t) => {
    const d = await page.evaluate((t) => { render(t); return document.getElementById("c").toDataURL("image/png"); }, t);
    return Buffer.from(d.split(",")[1], "base64");
  };

  if (mode === "stills") {
    const ts = rest.length ? rest.map(Number) : [0.5, 1.5, 2.6, 3.3, 3.9, 5.2, 7.2, 9.3, 11.2, 13.4, 14.1, 15.3, 17.6, 18.9, 19.8, 20.3, 20.7, 22.4, 25.0];
    fs.mkdirSync("stills", { recursive: true });
    for (const t of ts) fs.writeFileSync(`stills/${W}x${H}_${t.toFixed(2)}.png`, await grab(t));
    console.log(`wrote ${ts.length} stills to ${path.resolve("stills")}`);
  } else if (mode === "video") {
    const out = path.resolve(rest[0] || `out-${W}x${H}.mp4`);
    if (!fs.existsSync("music.wav")) throw new Error("music.wav missing - run `node music.js` first");
    const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-", "-i", "music.wav",
      "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
      "-shortest", "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });
    const N = Math.round(DUR * FPS);
    for (let f = 0; f < N; f++) {
      const buf = await grab(f / FPS);
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
      if (f % 60 === 0) console.log(`frame ${f} / ${N}`);
    }
    ff.stdin.end();
    await new Promise((r) => ff.on("close", r));
    console.log("wrote", out);
  } else {
    console.log("usage: node render.js stills|video <w> <h> [...]");
  }
  await browser.close();
})();
