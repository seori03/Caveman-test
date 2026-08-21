// 새로운 상위 Category를 추가하고 싶다면 이 배열에만 항목을 추가하면 됩니다.
// (필터, 배지 색상 등은 자동으로 이 목록을 따라갑니다.)
export const CATEGORIES = ["Clinical", "Wellness", "Sports"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  Clinical: "질환이나 손상으로 치료가 필요한 환자",
  Wellness: "건강 증진, 체력 향상, 움직임 개선이 목적인 일반인/고객",
  Sports: "경기력, 부상 예방, 부상 후 복귀 등이 중요한 선수",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  Clinical: "bg-brand-100 text-brand-800",
  Wellness: "bg-amber-100 text-amber-800",
  Sports: "bg-sky-100 text-sky-800",
};

export const SITE_NAV = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT ME" },
  { href: "/philosophy", label: "PHILOSOPHY" },
  { href: "/portfolio", label: "PORTFOLIO" },
  { href: "/clinical-reasoning", label: "CLINICAL REASONING" },
  { href: "/study", label: "STUDY & RESEARCH" },
  { href: "/growth-log", label: "GROWTH LOG" },
] as const;

export const SITE_TITLE = "Clinical Reasoning Growth Portfolio";
