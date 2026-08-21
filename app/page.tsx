import Link from "next/link";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import MarkdownContent from "@/components/MarkdownContent";
import { getAllCases, getAllGrowthLogs } from "@/lib/content";
import { marked } from "marked";

interface HomeFrontmatter {
  title: string;
  name: string;
  tagline: string;
}

function getHomeContent() {
  const filePath = path.join(process.cwd(), "content", "pages", "home.md");
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    frontmatter: data as HomeFrontmatter,
    html: marked.parse(content, { async: false }) as string,
  };
}

export default function HomePage() {
  const { frontmatter, html } = getHomeContent();
  const recentCases = getAllCases().slice(0, 3);
  const recentGrowth = getAllGrowthLogs().slice(0, 1)[0];

  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <section className="flex flex-col gap-5">
        <p className="section-label">{frontmatter.name}</p>
        <h1 className="max-w-2xl text-3xl font-semibold leading-snug text-ink sm:text-4xl">
          {frontmatter.tagline}
        </h1>
        <div className="max-w-prose text-ink/70">
          <MarkdownContent html={html} />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/portfolio"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Portfolio 보기
          </Link>
          <Link
            href="/clinical-reasoning"
            className="rounded-lg border border-brand-600 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
          >
            Clinical Reasoning
          </Link>
          <Link
            href="/about"
            className="rounded-lg border border-ink/15 px-4 py-2 text-sm font-medium text-ink/70 hover:bg-ink/5"
          >
            About Me
          </Link>
        </div>
      </section>

      {recentCases.length > 0 && (
        <section className="mt-20">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-ink">최근 Case</h2>
            <Link href="/portfolio" className="text-sm text-brand-600 hover:underline">
              전체 보기 →
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentCases.map((entry) => (
              <Link
                key={entry.slug}
                href={`/portfolio/${entry.slug}`}
                className="rounded-xl border border-ink/10 bg-white p-5 hover:shadow-md"
              >
                <p className="section-label">{entry.frontmatter.category}</p>
                <h3 className="mt-2 text-base font-semibold text-ink">
                  {entry.frontmatter.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {recentGrowth && (
        <section className="mt-16 rounded-xl border border-ink/10 bg-white p-6">
          <p className="section-label">Growth Log</p>
          <h3 className="mt-2 text-base font-semibold text-ink">
            {recentGrowth.frontmatter.title}
          </h3>
          <p className="mt-1 text-xs text-ink/40">{recentGrowth.frontmatter.date}</p>
          <Link
            href={`/growth-log/${recentGrowth.slug}`}
            className="mt-3 inline-block text-sm text-brand-600 hover:underline"
          >
            자세히 보기 →
          </Link>
        </section>
      )}
    </div>
  );
}
