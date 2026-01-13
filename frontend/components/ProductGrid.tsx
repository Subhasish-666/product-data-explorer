'use client';

import Link from 'next/link';

/* ---------------- Types ---------------- */

export type Product = {
  source_id: string;
  title: string;
  price: number;
  currency: string;
  image_url: string;
};

/* ---------------- Props ---------------- */

type ProductGridProps = {
  products?: Product[];
  isLoading?: boolean;
};

/* ---------------- Component ---------------- */

export default function ProductGrid({
  products,
  isLoading = false,
}: ProductGridProps) {
  /* -------- Loading State -------- */
  if (isLoading) {
    return (
      <div
        role="status"
        aria-label="Loading products"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-lg bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  /* -------- Empty State -------- */
  if (!products || products.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No products found.
      </p>
    );
  }

  /* -------- Grid -------- */
  return (
    <section
      aria-label="Product list"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
    >
      {products.map((product) => (
        <Link
          key={product.source_id}
          href={`/products/${product.source_id}`}
          className="group rounded-lg border bg-white p-4 hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <img
            src={product.image_url}
            alt={product.title}
            className="h-40 w-full object-contain mb-3"
            loading="lazy" // BONUS: performance
          />

          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-indigo-600">
            {product.title}
          </h3>

          <p className="mt-2 text-sm text-gray-700">
            {product.currency} {product.price}
          </p>
        </Link>
      ))}
    </section>
  );
}
