"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE_NAV, SITE_TITLE } from "@/lib/config";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-900/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight text-brand-900">
          {SITE_TITLE}
        </Link>

        <nav className="hidden gap-6 md:flex">
          {SITE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs font-medium tracking-wide transition-colors hover:text-brand-600 ${
                isActive(item.href) ? "text-brand-700" : "text-ink/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-brand-900/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="메뉴 열기"
        >
          <span className="sr-only">메뉴</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-4 bg-ink" />
            <span className="block h-0.5 w-4 bg-ink" />
            <span className="block h-0.5 w-4 bg-ink" />
          </div>
        </button>
      </div>

      {open && (
        <nav className="border-t border-brand-900/10 bg-paper px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-3">
            {SITE_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block text-sm font-medium ${
                    isActive(item.href) ? "text-brand-700" : "text-ink/80"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
