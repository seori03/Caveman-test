import { CATEGORY_COLORS, type Category } from "@/lib/config";

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${CATEGORY_COLORS[category]}`}
    >
      {category}
    </span>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink/70">
      #{children}
    </span>
  );
}
