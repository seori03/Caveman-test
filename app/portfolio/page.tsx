import { collectTags, getAllCases } from "@/lib/content";
import { CATEGORIES, CATEGORY_DESCRIPTIONS } from "@/lib/config";
import PortfolioFilter from "@/components/PortfolioFilter";

export default function PortfolioPage() {
  const cases = getAllCases();
  const allTags = collectTags(cases);
  const allAgeGroups = Array.from(
    new Set(cases.map((c) => c.frontmatter.ageGroup).filter(Boolean))
  ) as string[];

  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <p className="section-label">Portfolio</p>
      <h1 className="mt-2 text-2xl font-semibold text-ink">
        Clinical · Wellness · Sports
      </h1>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {CATEGORIES.map((category) => (
          <div key={category} className="rounded-lg border border-ink/10 bg-white p-4">
            <p className="text-sm font-semibold text-ink">{category}</p>
            <p className="mt-1 text-xs text-ink/50">{CATEGORY_DESCRIPTIONS[category]}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <PortfolioFilter cases={cases} allTags={allTags} allAgeGroups={allAgeGroups} />
      </div>
    </div>
  );
}
