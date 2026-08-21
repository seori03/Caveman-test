import MarkdownContent from "@/components/MarkdownContent";
import { getPage } from "@/lib/content";

const FLOW = [
  "Patient / Client",
  "Subjective Information",
  "Objective Assessment",
  "Problem Identification",
  "Hypothesis",
  "Differential Consideration",
  "Clinical Decision",
  "Intervention",
  "Re-assessment",
  "Reflection",
];

export default function ClinicalReasoningPage() {
  const { frontmatter, html } = getPage("clinical-reasoning");

  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <p className="section-label">Clinical Reasoning</p>
      <h1 className="mt-2 text-2xl font-semibold text-ink">{frontmatter.title}</h1>
      <p className="mt-3 max-w-prose text-sm text-ink/60">
        개별 Case가 &ldquo;이 사례에서 어떻게 판단했는가&rdquo;를 보여준다면, 이
        페이지는 &ldquo;나는 전반적으로 어떤 방식으로 임상적 판단을 하는 사람인가&rdquo;를
        보여줍니다.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        {FLOW.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <span className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-800">
              {step}
            </span>
            {i < FLOW.length - 1 && <span className="text-ink/20">→</span>}
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-prose">
        <MarkdownContent html={html} />
      </div>
    </div>
  );
}
