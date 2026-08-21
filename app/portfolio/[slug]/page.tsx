import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";
import { CategoryBadge, Tag } from "@/components/Badge";
import { getAllCases, getCaseBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllCases().map((entry) => ({ slug: entry.slug }));
}

export default function CaseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = getCaseBySlug(params.slug);
  if (!entry) return notFound();

  const { frontmatter, html } = entry;

  const overview: Array<[string, string | undefined]> = [
    ["Age Group", frontmatter.ageGroup],
    ["Diagnosis / Condition", frontmatter.condition],
    ["Main Goal", frontmatter.mainGoal],
    ["Date", frontmatter.date],
    ["Setting", frontmatter.setting],
  ];

  return (
    <article className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <div className="flex items-center gap-3">
        <CategoryBadge category={frontmatter.category} />
        <time className="text-xs text-ink/40">{frontmatter.date}</time>
      </div>

      <h1 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
        {frontmatter.title}
      </h1>

      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {frontmatter.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      <dl className="mt-8 grid gap-4 rounded-xl border border-ink/10 bg-white p-6 sm:grid-cols-2">
        {overview
          .filter(([, value]) => value)
          .map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                {label}
              </dt>
              <dd className="mt-1 text-sm text-ink">{value}</dd>
            </div>
          ))}
      </dl>

      <div className="mt-10 max-w-prose">
        <MarkdownContent html={html} />
      </div>
    </article>
  );
}
