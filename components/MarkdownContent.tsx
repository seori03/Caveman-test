export default function MarkdownContent({ html }: { html: string }) {
  return (
    <div
      className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-a:text-brand-600"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
