'use client';

import ProductCard from './ProductCard';

/* ---------------- Types ---------------- */

type ProductDetailProps = {
  source_id: string;
  title: string;
  image_url: string;
  price: number;
  currency: string;
  author?: string;
  ratings_avg?: number;
  reviews_count?: number;
  onRefresh?: () => void;
  refreshing?: boolean;
};

/* ---------------- Component ---------------- */

export default function ProductDetail({
  source_id,
  title,
  image_url,
  price,
  currency,
  author,
  ratings_avg,
  reviews_count,
  onRefresh,
  refreshing = false,
}: ProductDetailProps) {
  return (
    <section
      aria-label="Product details"
      className="mb-12"
    >
      {/* Main Product Card */}
      <ProductCard
        source_id={source_id}
        title={title}
        price={price}
        currency={currency}
        image_url={image_url}
      />

      {/* Metadata */}
      <div className="mt-4">
        {author && (
          <p className="text-gray-600 mb-2">
            by {author}
          </p>
        )}

        {ratings_avg && (
          <p className="text-sm text-gray-700 mb-4">
            ⭐ {ratings_avg} ({reviews_count} reviews)
          </p>
        )}

        {/* Manual Refresh (BONUS) */}
        {onRefresh && (
          <button
            aria-label="Refresh product data"
            onClick={onRefresh}
            disabled={refreshing}
            className="px-4 py-2 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            {refreshing ? 'Refreshing…' : 'Refresh Product Data'}
          </button>
        )}
      </div>
    </section>
  );
}
