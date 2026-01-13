'use client';

import Link from 'next/link';

/* ---------------- Types ---------------- */

export type BreadcrumbItem = {
  label: string;
  href?: string; // last breadcrumb can be non-clickable
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

/* ---------------- Component ---------------- */

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 text-sm text-gray-600"
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              className="flex items-center"
            >
              {!isLast && item.href ? (
                <Link
                  href={item.href}
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className="font-medium text-gray-900"
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span
                  aria-hidden="true"
                  className="mx-2 text-gray-400"
                >
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
