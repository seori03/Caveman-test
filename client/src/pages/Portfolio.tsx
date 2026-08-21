import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import HorseIllustration from "@/components/HorseIllustration";
import RiderSilhouette from "@/components/RiderSilhouette";
import { gaits, getGait, type GaitId } from "@/lib/gaits";

type SceneState = "LANDING" | "TRANSITION" | "SCENE_MOTION" | "SCENE_POSE";

const LANDING_SETTLE_MS = 5000;
const TRANSITION_MS = 640;

function LandingHorseCard({ gait, onSelect }: { gait: (typeof gaits)[number]; onSelect: (id: GaitId) => void }) {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(true), LANDING_SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <button
      type="button"
      className="gait-entry"
      onClick={() => onSelect(gait.id)}
      aria-label={`${gait.ko} ${gait.en} 선택 — 기수 자세와 움직임 보기`}
    >
      <span className="gait-entry-index mono">0{gait.order}</span>
      <span className="gait-entry-stage">
        <HorseIllustration gait={gait.id} animate={!settled} />
      </span>
      <span className="gait-entry-name">
        <strong>{gait.ko}</strong>
        <small className="mono">{gait.en}</small>
      </span>
      <span className="gait-entry-hint mono">탭하여 진입 →</span>
    </button>
  );
}

export default function Portfolio() {
  const [sceneState, setSceneState] = useState<SceneState>("LANDING");
  const [selectedGait, setSelectedGait] = useState<GaitId | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const chooseGait = (id: GaitId) => {
    clearTimers();
    setSelectedGait(id);
    setSceneState("TRANSITION");

    const gait = getGait(id);
    timers.current.push(
      window.setTimeout(() => setSceneState("SCENE_MOTION"), TRANSITION_MS),
      window.setTimeout(() => setSceneState("SCENE_POSE"), TRANSITION_MS + gait.motionSeconds * 1000),
    );
  };

  const reset = () => {
    clearTimers();
    setSceneState("LANDING");
    setSelectedGait(null);
  };

  const selected = selectedGait ? getGait(selectedGait) : null;
  const isSceneOpen = sceneState === "SCENE_MOTION" || sceneState === "SCENE_POSE";
  const isSceneMoving = sceneState === "SCENE_MOTION";

  return (
    <main className="site" data-scene-state={sceneState}>
      <header className="topbar">
        <span className="brand">
          서동주 <em>물리치료 × 승마</em>
        </span>
        <span className="mono topbar-sub">4보법 인터랙티브 포트폴리오</span>
      </header>

      {sceneState === "LANDING" && (
        <section className="landing" aria-label="보법 선택">
          <div className="landing-copy">
            <p className="eyebrow mono">01 / SELECT A GAIT</p>
            <h1>
              말을 고르면,
              <br />
              <em>보법이 시작됩니다.</em>
            </h1>
            <p className="landing-lede">
              첫 화면의 말 네 마리는 장식이 아니라 각각 다른 걸음걸이로 들어가는 입구입니다.
              평보 · 속보 · 구보 · 습보 — 선택한 말에 따라 기수의 자세와 움직임이 달라집니다.
            </p>
          </div>
          <div className="gait-row">
            {gaits.map((gait) => (
              <LandingHorseCard key={gait.id} gait={gait} onSelect={chooseGait} />
            ))}
          </div>
          <div className="landing-foot mono">
            <span>WALK — TROT — CANTER — GALLOP</span>
            <span>선택한 말이 다음 장면을 결정합니다</span>
          </div>
        </section>
      )}

      {selected && sceneState === "TRANSITION" && (
        <div className={`transition-stage gait-${selected.id}`} aria-live="polite">
          <div className="transition-copy">
            <span className="mono">ENTERING / {selected.en}</span>
            <h2>
              {selected.ko}
              <br />
              <em>{selected.en}</em>
            </h2>
          </div>
          <div className="transition-horse">
            <HorseIllustration gait={selected.id} animate />
          </div>
        </div>
      )}

      {selected && isSceneOpen && (
        <section className={`gait-scene gait-${selected.id}`} aria-live="polite">
          <div className="gait-scene-meta">
            <button className="icon-button" onClick={reset} aria-label="보법 선택으로 돌아가기">
              <ArrowLeft size={18} />
            </button>
            <div>
              <p className="mono eyebrow">
                {isSceneMoving ? "MOTION" : "FINAL POSE"} / {selected.en}
              </p>
              <h2>
                {selected.ko}
                <em> {selected.en}</em>
              </h2>
            </div>
            <span className="mono scene-clock">
              {isSceneMoving ? `${selected.beat} · 재생 중` : "대표 자세 · 정지"}
            </span>
          </div>

          <div className="gait-stage">
            <div className="gait-stage-figure">
              <HorseIllustration gait={selected.id} animate={isSceneMoving} className="scene-horse" />
              <RiderSilhouette gait={selected.id} animate={isSceneMoving} className="scene-rider" />
            </div>
            <p className="gait-posture-caption">
              <span className="mono">RIDER POSTURE</span>
              <strong>{selected.posture}</strong>
              <span className="gait-posture-detail">{selected.postureDetail}</span>
            </p>
          </div>

          <div className="gait-scene-bottom">
            <div>
              <span className="mono">GAIT</span>
              <p>
                {selected.beat} · {selected.tempoNote}
              </p>
            </div>
            <button className="reset-button mono" onClick={reset}>
              다른 보법 선택
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
