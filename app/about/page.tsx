import MarkdownContent from "@/components/MarkdownContent";
import { getPage } from "@/lib/content";

export default function AboutPage() {
  const { frontmatter, html } = getPage("about");

  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <p className="section-label">About Me</p>
      <h1 className="mt-2 text-2xl font-semibold text-ink">{frontmatter.title}</h1>
      <div className="mt-8 max-w-prose">
        <MarkdownContent html={html} />
      </div>
    </div>
  );
}
