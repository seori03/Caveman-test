import Link from "next/link";
import { Tag } from "./Badge";

export default function EntryCard({
  href,
  title,
  date,
  summary,
  tags,
}: {
  href: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-2 rounded-xl border border-ink/10 bg-white p-5 transition-shadow hover:shadow-md"
    >
      <time className="text-xs text-ink/40">{date}</time>
      <h3 className="text-base font-semibold text-ink group-hover:text-brand-700">
        {title}
      </h3>
      {summary && <p className="line-clamp-2 text-sm text-ink/60">{summary}</p>}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
    </Link>
  );
}
