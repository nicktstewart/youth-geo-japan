// Static topographic contour field (the promo video's backdrop motif). Rings are generated
// deterministically so server and client render the same markup. Deliberately not animated:
// it's painted once, which keeps the hero cheap on phones.
function contour(cx: number, cy: number, r: number, seed: number) {
  const points: string[] = [];
  const steps = 72;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const wobble =
      1 +
      0.13 * Math.sin(3 * a + seed) +
      0.07 * Math.sin(5 * a + seed * 1.7) +
      0.04 * Math.sin(8 * a + seed * 0.6);
    const x = cx + Math.cos(a) * r * wobble * 1.25;
    const y = cy + Math.sin(a) * r * wobble;
    points.push(`${Math.round(x)} ${Math.round(y)}`);
  }
  return `M${points.join(" L")} Z`;
}

const peaks = [
  { cx: 860, cy: 260, rings: 9, step: 46, seed: 1.3 },
  { cx: 140, cy: 560, rings: 6, step: 52, seed: 4.1 },
];

export function AnimatedBlob() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="map-grid absolute inset-0 opacity-30" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {peaks.map((peak, p) => (
          <g key={p}>
            {Array.from({ length: peak.rings }, (_, i) => (
              <path
                key={i}
                d={contour(peak.cx, peak.cy, 28 + i * peak.step, peak.seed + i * 0.35)}
                stroke={i % 4 === 3 ? "#6bbc70" : "#6A5748"}
                strokeOpacity={i % 4 === 3 ? 0.35 : 0.14}
                strokeWidth={i % 4 === 3 ? 1.6 : 1.1}
              />
            ))}
          </g>
        ))}
      </svg>
      <span className="hero-orb absolute left-[6%] top-[14%] size-24 rounded-full bg-[#a9dbee]/45" />
      <span className="hero-orb absolute bottom-[12%] right-[10%] size-36 rounded-full bg-[#6bbc70]/25" />
    </div>
  );
}
