"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, type Category } from "@/lib/config";
import type { CaseEntry } from "@/lib/types";
import CaseCard from "./CaseCard";

export default function PortfolioFilter({
  cases,
  allTags,
  allAgeGroups,
}: {
  cases: CaseEntry[];
  allTags: string[];
  allAgeGroups: string[];
}) {
  const [category, setCategory] = useState<Category | "All">("All");
  const [ageGroup, setAgeGroup] = useState<string>("All");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    return cases.filter((entry) => {
      const fm = entry.frontmatter;
      if (category !== "All" && fm.category !== category) return false;
      if (ageGroup !== "All" && fm.ageGroup !== ageGroup) return false;
      if (activeTags.length > 0) {
        const entryTags = fm.tags ?? [];
        const hasAll = activeTags.every((tag) => entryTags.includes(tag));
        if (!hasAll) return false;
      }
      if (query.trim()) {
        const haystack = `${fm.title} ${fm.summary ?? ""} ${fm.condition ?? ""}`.toLowerCase();
        if (!haystack.includes(query.trim().toLowerCase())) return false;
      }
      return true;
    });
  }, [cases, category, ageGroup, activeTags, query]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-xl border border-ink/10 bg-white p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink/40">
            Category
          </span>
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                category === c
                  ? "bg-brand-600 text-white"
                  : "bg-ink/5 text-ink/60 hover:bg-ink/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {allAgeGroups.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Age Group
            </span>
            {(["All", ...allAgeGroups] as const).map((a) => (
              <button
                key={a}
                onClick={() => setAgeGroup(a)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  ageGroup === a
                    ? "bg-brand-600 text-white"
                    : "bg-ink/5 text-ink/60 hover:bg-ink/10"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        )}

        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Tag
            </span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeTags.includes(tag)
                    ? "bg-brand-600 text-white"
                    : "bg-ink/5 text-ink/60 hover:bg-ink/10"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색 (제목, 요약, 진단명)"
          className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm outline-none focus:border-brand-400"
        />
      </div>

      <p className="text-xs text-ink/40">{filtered.length}개의 Case</p>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-ink/15 p-8 text-center text-sm text-ink/40">
          조건에 맞는 Case가 아직 없습니다.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => (
            <CaseCard key={entry.slug} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
