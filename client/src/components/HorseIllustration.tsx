import type { GaitId } from "@/lib/gaits";

interface HorseIllustrationProps {
  gait: GaitId;
  /** When false, the leg/tail animation is paused on its resting pose. */
  animate?: boolean;
  className?: string;
}

/**
 * Placeholder ink-sketch horse art, built from stroked SVG paths instead of a
 * real illustration file. It stands in for the hand-drawn horse artwork
 * referenced in the design spec (monotone ink brush style) until real frames
 * are uploaded to /client/public/horses/{gait}.png — see that folder's
 * README for the expected filenames. The four leg segments are articulated
 * independently so each gait gets a visually distinct stride, not just a
 * different playback speed.
 */
export default function HorseIllustration({ gait, animate = true, className }: HorseIllustrationProps) {
  return (
    <svg
      viewBox="0 0 220 150"
      className={`horse-figure horse-figure--${gait} ${animate ? "is-animating" : "is-resting"} ${className ?? ""}`}
      role="img"
      aria-label={`${gait} 걸음걸이 말 스케치`}
    >
      <defs>
        <filter id={`ink-roughen-${gait}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" />
        </filter>
      </defs>

      <g filter={`url(#ink-roughen-${gait})`} className="horse-body-group">
        {/* Tail */}
        <path className="horse-stroke horse-tail" d="M32,58 Q10,64 14,84 Q18,98 30,104" fill="none" />
        {/* Topline: rump -> back -> neck -> poll -> nose -> throat -> chest */}
        <path
          className="horse-stroke horse-topline"
          d="M32,58 Q70,32 110,44 Q138,22 152,16 Q170,16 186,24 Q176,36 166,46"
          fill="none"
        />
        {/* Belly: chest -> belly -> flank */}
        <path className="horse-stroke horse-belly" d="M152,62 Q112,82 72,80 Q52,78 36,70" fill="none" />
        {/* mane ticks */}
        <path className="horse-stroke horse-mane" d="M116,38 L120,28 M128,32 L132,23 M140,26 L144,18" fill="none" />

        {/* Hind leg (near pivot ~66,62) */}
        <g className="leg leg-hind-upper" style={{ transformOrigin: "66px 62px" }}>
          <path className="horse-stroke horse-leg" d="M66,62 L58,92" fill="none" />
          <g className="leg leg-hind-lower" style={{ transformOrigin: "58px 92px" }}>
            <path className="horse-stroke horse-leg" d="M58,92 L54,122" fill="none" />
          </g>
        </g>

        {/* Front leg (near pivot ~152,64) */}
        <g className="leg leg-front-upper" style={{ transformOrigin: "152px 64px" }}>
          <path className="horse-stroke horse-leg" d="M152,64 L148,96" fill="none" />
          <g className="leg leg-front-lower" style={{ transformOrigin: "148px 96px" }}>
            <path className="horse-stroke horse-leg" d="M148,96 L144,126" fill="none" />
          </g>
        </g>

        {/* eye */}
        <circle className="horse-eye" cx="172" cy="26" r="1.8" />
      </g>
    </svg>
  );
}
