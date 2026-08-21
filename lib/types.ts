import type { Category } from "./config";

export interface CaseFrontmatter {
  title: string;
  category: Category;
  ageGroup?: string;
  condition?: string;
  mainGoal?: string;
  date: string;
  setting?: string;
  tags?: string[];
  summary?: string;
  draft?: boolean;
}

export interface CaseEntry {
  slug: string;
  frontmatter: CaseFrontmatter;
  html: string;
}

export interface StudyFrontmatter {
  title: string;
  date: string;
  topic?: string;
  tags?: string[];
  summary?: string;
  draft?: boolean;
}

export interface StudyEntry {
  slug: string;
  frontmatter: StudyFrontmatter;
  html: string;
}

export interface GrowthLogFrontmatter {
  title: string;
  date: string;
  year?: string;
  tags?: string[];
  summary?: string;
  draft?: boolean;
}

export interface GrowthLogEntry {
  slug: string;
  frontmatter: GrowthLogFrontmatter;
  html: string;
}

export interface PageFrontmatter {
  title: string;
}

export interface PageEntry {
  slug: string;
  frontmatter: PageFrontmatter;
  html: string;
}
