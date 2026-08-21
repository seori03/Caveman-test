export type GaitId = "walk" | "trot" | "canter" | "gallop";

export interface Gait {
  id: GaitId;
  order: number;
  ko: string;
  en: string;
  beat: string;
  tempoNote: string;
  /** One-line rider posture summary, condensed from the production spec PDF. */
  posture: string;
  /** Longer posture description shown on the gait scene. */
  postureDetail: string;
  /** Roughly how many seconds the gait motion plays before settling on the final pose. */
  motionSeconds: number;
}

// Order matches the DOCX instruction: left -> right on the landing screen is
// 평보(Walk) -> 속보(Trot) -> 구보(Canter) -> 습보(Gallop).
export const gaits: Gait[] = [
  {
    id: "walk",
    order: 1,
    ko: "평보",
    en: "WALK",
    beat: "4박자",
    tempoNote: "가장 안정적인 걸음걸이 · 충격 최소",
    posture: "이완된 중립 자세",
    postureDetail:
      "척추와 골반이 이완된 중립위를 유지하며, 말의 리듬에 따라 자연스럽게 좌우로 교대 흔들립니다.",
    motionSeconds: 5,
  },
  {
    id: "trot",
    order: 2,
    ko: "속보",
    en: "TROT",
    beat: "2박자",
    tempoNote: "대각선 이동 · 코어 안정화 필수",
    posture: "라이징 트롯 리듬",
    postureDetail:
      "말의 대각선 다리 박자에 맞춰 골반이 안장에서 살짝 들리는 라이징 타이밍으로 움직입니다.",
    motionSeconds: 4,
  },
  {
    id: "canter",
    order: 3,
    ko: "구보",
    en: "CANTER",
    beat: "3박자",
    tempoNote: "파도형 움직임 · 좌우 비대칭 주의",
    posture: "팔로잉 시트",
    postureDetail:
      "3박자 리듬에 맞춰 척추가 파도치듯 굴곡·신전하고, 골반이 캔터 스트라이드를 따라갑니다.",
    motionSeconds: 4,
  },
  {
    id: "gallop",
    order: 4,
    ko: "습보",
    en: "GALLOP",
    beat: "4박자",
    tempoNote: "가장 빠른 걸음걸이 · 전방 체중이동",
    posture: "라이트 시트(경엽) 자세",
    postureDetail:
      "척추 굴곡이 늘고 몸통이 전방으로 기울며, 골반이 안장에서 살짝 들려 체중이 등자로 이동합니다.",
    motionSeconds: 3,
  },
];

export const getGait = (id: GaitId) => gaits.find((g) => g.id === id)!;
