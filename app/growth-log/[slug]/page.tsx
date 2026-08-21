import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";
import { Tag } from "@/components/Badge";
import { getAllGrowthLogs, getGrowthLogBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllGrowthLogs().map((entry) => ({ slug: entry.slug }));
}

export default function GrowthLogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = getGrowthLogBySlug(params.slug);
  if (!entry) return notFound();

  const { frontmatter, html } = entry;

  return (
    <article className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <time className="text-xs text-ink/40">{frontmatter.date}</time>
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

      <div className="mt-10 max-w-prose">
        <MarkdownContent html={html} />
      </div>
    </article>
  );
}
