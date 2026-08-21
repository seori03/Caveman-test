import Link from "next/link";
import type { CaseEntry } from "@/lib/types";
import { CategoryBadge, Tag } from "./Badge";

export default function CaseCard({ entry }: { entry: CaseEntry }) {
  const { slug, frontmatter } = entry;

  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-ink/10 bg-white p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <CategoryBadge category={frontmatter.category} />
        <time className="text-xs text-ink/40">{frontmatter.date}</time>
      </div>

      <h3 className="text-base font-semibold text-ink group-hover:text-brand-700">
        {frontmatter.title}
      </h3>

      {frontmatter.summary && (
        <p className="line-clamp-2 text-sm text-ink/60">{frontmatter.summary}</p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {frontmatter.ageGroup && <Tag>{frontmatter.ageGroup}</Tag>}
        {frontmatter.tags?.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  );
}
