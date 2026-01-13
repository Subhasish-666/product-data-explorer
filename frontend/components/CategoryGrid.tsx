'use client';

import Link from 'next/link';

/* ---------------- Types ---------------- */

export type Category = {
  id: string;
  title: string;
  slug: string;
  product_count?: number;
};

/* ---------------- Props ---------------- */

type CategoryGridProps = {
  categories?: Category[];
  isLoading?: boolean;
};

/* ---------------- Component ---------------- */

export default function CategoryGrid({
  categories,
  isLoading = false,
}: CategoryGridProps) {
  /* -------- Loading State -------- */
  if (isLoading) {
    return (
      <div
        role="status"
        aria-label="Loading categories"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-lg bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  /* -------- Empty State -------- */
  if (!categories || categories.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No categories available.
      </p>
    );
  }

  /* -------- Grid -------- */
  return (
    <section
      aria-label="Category list"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
    >
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="group block rounded-lg border bg-white p-4 hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
            {category.title}
          </h3>

          {category.product_count !== undefined && (
            <p className="mt-1 text-xs text-gray-500">
              {category.product_count} products
            </p>
          )}
        </Link>
      ))}
    </section>
  );
}
