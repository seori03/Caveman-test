import { collectTags, getAllStudyNotes } from "@/lib/content";
import EntryCard from "@/components/EntryCard";

export default function StudyPage() {
  const notes = getAllStudyNotes();
  const topics = Array.from(
    new Set(notes.map((n) => n.frontmatter.topic).filter(Boolean))
  ) as string[];
  const tags = collectTags(notes);

  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <p className="section-label">Study & Research</p>
      <h1 className="mt-2 text-2xl font-semibold text-ink">공부 · 근거 기록</h1>
      <p className="mt-3 max-w-prose text-sm text-ink/60">
        단순 암기노트가 아니라, 임상에 어떻게 연결되는지까지 기록하는 Study
        Archive입니다.
      </p>

      {topics.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <span
              key={t}
              className="rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink/60"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-brand-50 px-2.5 py-1 text-xs text-brand-700"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes.length === 0 ? (
          <p className="col-span-full rounded-xl border border-dashed border-ink/15 p-8 text-center text-sm text-ink/40">
            아직 등록된 Study Note가 없습니다.
          </p>
        ) : (
          notes.map((entry) => (
            <EntryCard
              key={entry.slug}
              href={`/study/${entry.slug}`}
              title={entry.frontmatter.title}
              date={entry.frontmatter.date}
              summary={entry.frontmatter.summary}
              tags={entry.frontmatter.tags}
            />
          ))
        )}
      </div>
    </div>
  );
}
