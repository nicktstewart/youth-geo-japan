// Synthesizes a 120 BPM punchy track, 26s, synced to the video beat grid.
const fs = require("fs");
const SR = 44100, BPM = 120, BEAT = 60 / BPM, DUR = 26.5;
const N = Math.floor(SR * DUR);
const L = new Float32Array(N), R = new Float32Array(N);
const fx = new Float32Array(N); // send bus for delay
let seed = 1;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
const at = (b) => Math.floor(b * BEAT * SR);
const add = (i, v, pan = 0, send = 0) => {
  if (i < 0 || i >= N) return;
  L[i] += v * (1 - Math.max(0, pan));
  R[i] += v * (1 + Math.min(0, pan));
  fx[i] += v * send;
};
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

function kick(b, amp = 1) {
  const s = at(b), len = SR * 0.45;
  let ph = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const f = 48 + 140 * Math.exp(-t * 28);
    ph += (2 * Math.PI * f) / SR;
    const env = Math.exp(-t * 7.5);
    const click = i < 200 ? rnd() * (1 - i / 200) * 0.5 : 0;
    add(s + i, Math.tanh((Math.sin(ph) * env * 1.6 + click)) * 0.9 * amp);
  }
}
function clap(b, amp = 1) {
  const s = at(b), len = SR * 0.25;
  let lp = 0, prev = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const burst = t < 0.03 ? (Math.floor(t / 0.01) % 2 === 0 ? 1 : 0.4) : 1;
    const n = rnd();
    lp += 0.35 * (n - lp);
    const hp = lp - prev; prev = lp;
    add(s + i, hp * 2.2 * Math.exp(-t * 18) * burst * amp, 0, 0.25);
  }
}
function hat(b, amp = 1, open = false) {
  const s = at(b), len = SR * (open ? 0.2 : 0.05);
  let prev = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const n = rnd();
    const hp = n - prev; prev = n;
    add(s + i, hp * 0.18 * Math.exp(-t * (open ? 14 : 70)) * amp, 0.3);
  }
}
function saw(ph) { return 2 * (ph - Math.floor(ph + 0.5)); }
function bass(b, midi, durB = 0.45, amp = 1) {
  const s = at(b), len = Math.floor(durB * BEAT * SR), f = mtof(midi);
  let lp = 0, ph = 0, ph2 = 0;
  for (let i = 0; i < len + 400; i++) {
    const t = i / SR;
    ph += f / SR; ph2 += (f * 0.5) / SR;
    const x = saw(ph) * 0.6 + Math.sin(2 * Math.PI * ph2) * 0.8;
    const cut = 0.04 + 0.25 * Math.exp(-t * 18);
    lp += cut * (x - lp);
    const env = Math.min(1, i / 60) * (i < len ? 1 : 1 - (i - len) / 400);
    add(s + i, Math.tanh(lp * 1.4) * 0.42 * env * amp);
  }
}
function stab(b, notes, amp = 1, dec = 9) {
  const s = at(b), len = SR * 0.5;
  const voices = [];
  notes.forEach((m) => [-0.12, 0, 0.12].forEach((d) => voices.push({ f: mtof(m + d), ph: (rnd() + 1) / 2 })));
  let lp = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    let x = 0;
    for (const v of voices) { v.ph += v.f / SR; x += saw(v.ph); }
    x /= voices.length;
    lp += (0.08 + 0.4 * Math.exp(-t * 12)) * (x - lp);
    const env = Math.exp(-t * dec) * Math.min(1, i / 100);
    const v = lp * 0.55 * env * amp;
    add(s + i, v, 0.15 * Math.sin(i / 3000), 0.5);
  }
}
function pad(b, notes, durB, amp = 1) {
  const s = at(b), len = Math.floor(durB * BEAT * SR);
  const voices = [];
  notes.forEach((m) => [-0.08, 0.08].forEach((d) => voices.push({ f: mtof(m + d), ph: (rnd() + 1) / 2 })));
  let lp = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    let x = 0;
    for (const v of voices) { v.ph += v.f / SR; x += saw(v.ph); }
    x /= voices.length;
    lp += 0.03 * (x - lp);
    const env = Math.min(1, t / 0.08) * Math.exp(-t * 0.35) * Math.min(1, (len - i) / (SR * 1.5));
    add(s + i, lp * 0.5 * env * amp, 0, 0.4);
  }
}
function riser(b0, b1, amp = 1) {
  const s = at(b0), len = at(b1) - s;
  let lp = 0, prev = 0;
  for (let i = 0; i < len; i++) {
    const p = i / len;
    const n = rnd();
    lp += (0.02 + p * 0.6) * (n - lp);
    const hp = lp - prev * (0.2 + p * 0.7); prev = lp;
    add(s + i, hp * 0.22 * p * p * amp, Math.sin(i / 4000) * 0.4, 0.3);
  }
}
function impact(b) {
  kick(b, 1.3);
  const s = at(b), len = SR * 2.5;
  let lp = 0, ph = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    ph += (2 * Math.PI * (38 + 30 * Math.exp(-t * 6))) / SR;
    lp += 0.15 * (rnd() - lp);
    add(s + i, Math.sin(ph) * 0.7 * Math.exp(-t * 1.6) + lp * 0.5 * Math.exp(-t * 2.5), 0, 0.3);
  }
}

// Chord progression per bar: Am F C G  (vi IV I V in C)
const prog = [
  { root: 45, chord: [69, 72, 76, 79] }, // Am7
  { root: 41, chord: [69, 72, 77, 79] }, // Fmaj9-ish
  { root: 48, chord: [67, 72, 76, 79] }, // C
  { root: 43, chord: [67, 71, 74, 79] }, // G
];
const barOf = (b) => prog[Math.floor(b / 4) % 4];

// Intro b0-8: kicks every 2 beats with word slams, filtered stabs
for (let b = 0; b < 8; b += 2) { kick(b, 0.9); stab(b, barOf(b).chord, 0.5, 6); }
for (let b = 4; b < 8; b += 0.5) hat(b + 0.5 * 0, 0.6);
kick(6, 0.9); kick(7, 1); kick(7.5, 0.8); clap(7, 1); riser(4, 8, 0.6);

// Main groove b8-36
for (let b = 8; b < 36; b++) {
  kick(b);
  hat(b + 0.5, 1, b % 4 === 3);
  if (b % 2 === 1) clap(b);
  const c = barOf(b);
  bass(b + 0.5, c.root);
  if (b % 4 === 0) bass(b, c.root, 0.3, 0.7);
  hat(b + 0.25, 0.4); hat(b + 0.75, 0.4);
}
// syncopated stabs
for (let bar = 2; bar < 9; bar++) {
  const b0 = bar * 4, c = prog[bar % 4].chord;
  [0, 0.75, 1.5, 2.5, 3.25].forEach((o) => stab(b0 + o, c, 0.8));
}
// little fills at section changes
[11.5, 27.5].forEach((b) => { clap(b, 0.8); clap(b + 0.25, 0.9); });

// Build b36-40: kick halves, snare roll, riser
for (let b = 36; b < 38; b++) kick(b, 0.9);
for (let b = 36; b < 40; b += b < 38 ? 0.5 : b < 39 ? 0.25 : 0.125) clap(b, 0.4 + (b - 36) * 0.15);
riser(36, 40, 1.2);
stab(36, prog[1].chord, 0.7); stab(37, prog[1].chord, 0.7); stab(38, prog[3].chord, 0.8); stab(39, prog[3].chord, 0.9);

// Drop / logo b40+
impact(40);
pad(40, [60, 64, 67, 71, 76], 12.5, 1.1);
bass(40, 36, 6, 0.8);
const arp = [72, 76, 79, 83, 84, 83, 79, 76];
for (let i = 0; i < 40; i++) {
  const b = 40 + i * 0.25;
  const fade = 1 - i / 40;
  stab(b, [arp[i % 8]], 0.45 * fade, 14);
}
for (let b = 44; b < 50; b++) { kick(b, 0.55 * (1 - (b - 44) / 7)); hat(b + 0.5, 0.6); }

// Delay bus (dotted 8th) + master
const D = Math.floor(0.75 * BEAT * SR);
for (let i = D; i < N; i++) { fx[i] += fx[i - D] * 0.38; }
const out = Buffer.alloc(44 + N * 4);
let peak = 0;
for (let i = 0; i < N; i++) {
  const dl = i >= D ? fx[i - D] * 0.35 : 0;
  L[i] += dl; R[i] += dl * 0.9;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const g = 0.95 / Math.tanh(peak * 0.9);
for (let i = 0; i < N; i++) {
  const fadeOut = Math.min(1, (N - i) / (SR * 1.2));
  out.writeInt16LE(Math.round(Math.tanh(L[i] * 0.9) * g * fadeOut * 32000), 44 + i * 4);
  out.writeInt16LE(Math.round(Math.tanh(R[i] * 0.9) * g * fadeOut * 32000), 46 + i * 4);
}
out.write("RIFF", 0); out.writeUInt32LE(36 + N * 4, 4); out.write("WAVEfmt ", 8);
out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(2, 22);
out.writeUInt32LE(SR, 24); out.writeUInt32LE(SR * 4, 28); out.writeUInt16LE(4, 32);
out.writeUInt16LE(16, 34); out.write("data", 36); out.writeUInt32LE(N * 4, 40);
fs.writeFileSync("music.wav", out);
console.log("music.wav written, peak", peak.toFixed(2));
