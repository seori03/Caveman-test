import type { GaitId } from "@/lib/gaits";

interface RiderSilhouetteProps {
  gait: GaitId;
  animate?: boolean;
  className?: string;
}

/**
 * Placeholder ink-sketch rider, seated on the horse's back. Posture differs
 * per gait per the production spec: walk/trot/canter keep a mostly upright
 * seat, gallop shifts into a forward "light seat" (라이트 시트) with the
 * torso leaning forward and the seat lifted off the saddle.
 */
export default function RiderSilhouette({ gait, animate = true, className }: RiderSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 220 150"
      className={`rider-figure rider-figure--${gait} ${animate ? "is-animating" : "is-resting"} ${className ?? ""}`}
      role="img"
      aria-label={`${gait} 자세 기수 스케치`}
    >
      <g className="rider-body-group">
        {/* seat anchored just above the horse's back / withers */}
        <g className="rider-pose">
          {/* torso */}
          <path className="horse-stroke rider-torso" d="M118,58 L108,26" fill="none" />
          {/* head */}
          <circle className="horse-stroke rider-head" cx="105" cy="18" r="7" fill="none" />
          {/* arm to the rein */}
          <path className="horse-stroke rider-arm" d="M112,36 L128,44" fill="none" />
          {/* thigh + lower leg, bent at the knee over the saddle flap */}
          <path className="horse-stroke rider-thigh" d="M118,58 L140,64" fill="none" />
          <path className="horse-stroke rider-shin" d="M140,64 L138,92" fill="none" />
        </g>
      </g>
    </svg>
  );
}
