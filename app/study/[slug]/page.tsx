import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";
import { Tag } from "@/components/Badge";
import { getAllStudyNotes, getStudyBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllStudyNotes().map((entry) => ({ slug: entry.slug }));
}

export default function StudyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = getStudyBySlug(params.slug);
  if (!entry) return notFound();

  const { frontmatter, html } = entry;

  return (
    <article className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <div className="flex items-center gap-3">
        {frontmatter.topic && (
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
            {frontmatter.topic}
          </span>
        )}
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

      <div className="mt-10 max-w-prose">
        <MarkdownContent html={html} />
      </div>
    </article>
  );
}
