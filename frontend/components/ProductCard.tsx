'use client';

import Link from 'next/link';

/* ---------------- Types ---------------- */

export type ProductCardProps = {
  source_id: string;
  title: string;
  price: number;
  currency: string;
  image_url: string;
  onClick?: () => void; // BONUS: analytics / tracking hook
};

/* ---------------- Component ---------------- */

export default function ProductCard({
  source_id,
  title,
  price,
  currency,
  image_url,
  onClick,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${source_id}`}
      onClick={onClick}
      className="group block rounded-lg border bg-white p-4 hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    >
      <img
        src={image_url}
        alt={title}
        loading="lazy" // BONUS: performance
        className="h-40 w-full object-contain mb-3"
      />

      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-indigo-600">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-700">
        {currency} {price}
      </p>
    </Link>
  );
}
