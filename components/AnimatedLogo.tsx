import { useId } from "react";

// Vector rebuild of public/YGJ-logo-only.png in its 640×640 space, assembled with the
// same sequence as the promo video (promo/source/index.html → logo()):
// stadium pops → colour regions bloom from the line crossing → horizon wipes → arrow shoots in.
type AnimatedLogoProps = {
  className?: string;
  /** "hero" plays the full build with speed streaks and an afterglow ring; "mark" is the compact header/footer version. */
  variant?: "hero" | "mark";
  /** Seconds before the build starts. */
  delay?: number;
  title?: string;
};

const ink = "#3e3a39";
// Below / above the arrow line, below / above the horizon line (extended well past the art).
const belowArrow = "M-200 568.4 L900 16.5 L900 900 L-200 900 Z";
const aboveArrow = "M-200 568.4 L900 16.5 L900 -300 L-200 -300 Z";
const belowHorizon = "M-200 264.3 L900 473.1 L900 900 L-200 900 Z";
const aboveHorizon = "M-200 264.3 L900 473.1 L900 -300 L-200 -300 Z";
const stadium = "M236.5 145 H403.5 A173.5 173.5 0 0 1 403.5 492 H236.5 A173.5 173.5 0 0 1 236.5 145 Z";

export function AnimatedLogo({ className, variant = "mark", delay = 0, title }: AnimatedLogoProps) {
  const id = useId().replace(/:/g, "");
  const clip = (name: string) => `url(#${id}-${name})`;

  return (
    <svg
      className={`ygj-logo ygj-logo-${variant} ${className ?? ""}`}
      viewBox="0 0 640 640"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ "--ygj-delay": `${delay}s` } as React.CSSProperties}
    >
      <defs>
        <clipPath id={`${id}-stadium`}><path d={stadium} /></clipPath>
        <clipPath id={`${id}-ba`}><path d={belowArrow} /></clipPath>
        <clipPath id={`${id}-aa`}><path d={aboveArrow} /></clipPath>
        <clipPath id={`${id}-bh`}><path d={belowHorizon} /></clipPath>
        <clipPath id={`${id}-ah`}><path d={aboveHorizon} /></clipPath>
      </defs>

      {variant === "hero" ? (
        <path className="ygj-pulse" d={stadium} fill="none" stroke="#6bbc70" strokeWidth="6" />
      ) : null}

      <g className="ygj-body">
        <g clipPath={clip("stadium")}>
          <circle className="ygj-region" style={{ "--i": 0 } as React.CSSProperties} cx="235" cy="345" r="520" fill="#a9dbee" />
          <g clipPath={clip("ba")}>
            <g clipPath={clip("ah")}>
              <circle className="ygj-region" style={{ "--i": 1 } as React.CSSProperties} cx="235" cy="345" r="520" fill="#6bbc70" />
            </g>
          </g>
          <g clipPath={clip("aa")}>
            <g clipPath={clip("bh")}>
              <circle className="ygj-region" style={{ "--i": 2 } as React.CSSProperties} cx="235" cy="345" r="520" fill="#e4ebf1" />
            </g>
          </g>
          <g clipPath={clip("ba")}>
            <g clipPath={clip("bh")}>
              <circle className="ygj-region" style={{ "--i": 3 } as React.CSSProperties} cx="235" cy="345" r="520" fill="#f8d478" />
            </g>
          </g>
        </g>
      </g>

      <line className="ygj-horizon" x1="30" y1="308" x2="620" y2="420" stroke={ink} strokeWidth="17" pathLength={1} />

      <g className="ygj-arrow">
        {variant === "hero" ? (
          <g className="ygj-streaks" stroke={ink} strokeLinecap="round">
            <line x1="286.5" y1="303.2" x2="-517.9" y2="706.8" strokeWidth="5" opacity="0.6" />
            <line x1="311.7" y1="353.2" x2="-492.7" y2="756.8" strokeWidth="3" opacity="0.4" />
            <line x1="324.7" y1="379.2" x2="-479.7" y2="782.8" strokeWidth="2" opacity="0.3" />
            <line x1="273.1" y1="276.4" x2="-531.3" y2="680" strokeWidth="2" opacity="0.3" />
          </g>
        ) : null}
        <g className="ygj-arrow-inner">
          <path d="M18 428 L503 207 L522 223 L24 490 Q16 492 16 482 Z" fill={ink} />
          <path d="M452 207 L612 160 L541 238 L508 218 Z" fill={ink} />
          <path d="M512 214 L598 170 L541 226 Z" fill="#e9eef3" />
        </g>
      </g>
    </svg>
  );
}
