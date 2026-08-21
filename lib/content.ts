import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type {
  CaseEntry,
  CaseFrontmatter,
  GrowthLogEntry,
  GrowthLogFrontmatter,
  PageEntry,
  StudyEntry,
  StudyFrontmatter,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

marked.setOptions({ gfm: true, breaks: false });

function markdownToHtml(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}

// YAML의 날짜 없이 따옴표 없이 쓰인 값(예: date: 2026-08-15)은 js-yaml이
// 자동으로 Date 객체로 파싱하므로, 문자열(YYYY-MM-DD)로 되돌려줍니다.
function normalizeDates<T>(data: T): T {
  const result: Record<string, unknown> = { ...(data as Record<string, unknown>) };
  for (const key of Object.keys(result)) {
    const value = result[key];
    if (value instanceof Date) {
      result[key] = value.toISOString().slice(0, 10);
    }
  }
  return result as T;
}

function readMarkdownDir<TFrontmatter>(dirName: string) {
  const dir = path.join(CONTENT_DIR, dirName);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        frontmatter: normalizeDates(data) as TFrontmatter,
        html: markdownToHtml(content),
      };
    });
}

function isNotDraft<T extends { frontmatter: { draft?: boolean } }>(entry: T) {
  return !entry.frontmatter.draft;
}

function byDateDesc<T extends { frontmatter: { date: string } }>(a: T, b: T) {
  return b.frontmatter.date.localeCompare(a.frontmatter.date);
}

// ---------- Cases (Portfolio) ----------

export function getAllCases(): CaseEntry[] {
  return readMarkdownDir<CaseFrontmatter>("cases")
    .filter(isNotDraft)
    .sort(byDateDesc);
}

export function getCaseBySlug(slug: string): CaseEntry | undefined {
  return readMarkdownDir<CaseFrontmatter>("cases").find(
    (entry) => entry.slug === slug
  );
}

// ---------- Study & Research ----------

export function getAllStudyNotes(): StudyEntry[] {
  return readMarkdownDir<StudyFrontmatter>("study")
    .filter(isNotDraft)
    .sort(byDateDesc);
}

export function getStudyBySlug(slug: string): StudyEntry | undefined {
  return readMarkdownDir<StudyFrontmatter>("study").find(
    (entry) => entry.slug === slug
  );
}

// ---------- Growth Log ----------

export function getAllGrowthLogs(): GrowthLogEntry[] {
  return readMarkdownDir<GrowthLogFrontmatter>("growth-log")
    .filter(isNotDraft)
    .sort(byDateDesc);
}

export function getGrowthLogBySlug(slug: string): GrowthLogEntry | undefined {
  return readMarkdownDir<GrowthLogFrontmatter>("growth-log").find(
    (entry) => entry.slug === slug
  );
}

// ---------- Static pages (Home / About / Philosophy / Clinical Reasoning) ----------

export function getPage(slug: string): PageEntry {
  const filePath = path.join(CONTENT_DIR, "pages", `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as { title: string },
    html: markdownToHtml(content),
  };
}

// ---------- Shared tag/filter helpers ----------

export function collectTags<T extends { frontmatter: { tags?: string[] } }>(
  entries: T[]
): string[] {
  const tagSet = new Set<string>();
  entries.forEach((entry) => {
    entry.frontmatter.tags?.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}
