import Link from "next/link";
import { getAllGrowthLogs } from "@/lib/content";
import { Tag } from "@/components/Badge";

export default function GrowthLogPage() {
  const entries = getAllGrowthLogs();

  const byYear = entries.reduce<Record<string, typeof entries>>((acc, entry) => {
    const year = entry.frontmatter.year ?? entry.frontmatter.date.slice(0, 4);
    acc[year] = acc[year] ? [...acc[year], entry] : [entry];
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));

  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <p className="section-label">Growth Log</p>
      <h1 className="mt-2 text-2xl font-semibold text-ink">시간순 성장 기록</h1>
      <p className="mt-3 max-w-prose text-sm text-ink/60">
        시간이 지나면서 나의 생각과 임상적 판단이 어떻게 바뀌었는지를 기록합니다.
      </p>

      {years.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-ink/15 p-8 text-center text-sm text-ink/40">
          아직 등록된 Growth Log가 없습니다.
        </p>
      ) : (
        <div className="mt-10 flex flex-col gap-10">
          {years.map((year) => (
            <section key={year}>
              <h2 className="text-lg font-semibold text-brand-800">{year}</h2>
              <ol className="mt-4 flex flex-col gap-4 border-l border-ink/10 pl-6">
                {byYear[year].map((entry) => (
                  <li key={entry.slug} className="relative">
                    <span className="absolute -left-[1.65rem] top-1.5 h-2 w-2 rounded-full bg-brand-500" />
                    <Link
                      href={`/growth-log/${entry.slug}`}
                      className="block rounded-lg border border-ink/10 bg-white p-4 hover:shadow-md"
                    >
                      <time className="text-xs text-ink/40">{entry.frontmatter.date}</time>
                      <h3 className="mt-1 text-sm font-semibold text-ink">
                        {entry.frontmatter.title}
                      </h3>
                      {entry.frontmatter.summary && (
                        <p className="mt-1 line-clamp-2 text-sm text-ink/60">
                          {entry.frontmatter.summary}
                        </p>
                      )}
                      {entry.frontmatter.tags && entry.frontmatter.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {entry.frontmatter.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </div>
                      )}
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
