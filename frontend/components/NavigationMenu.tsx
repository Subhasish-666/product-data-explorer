'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getNavigation } from '@/lib/api';

/* ---------------- Types ---------------- */

type NavigationItem = {
  id: string;
  title: string;
  slug: string;
};

/* ---------------- Component ---------------- */

export default function NavigationMenu() {
  const {
    data,
    isLoading,
    isError,
  } = useQuery<NavigationItem[]>({
    queryKey: ['navigation'],
    queryFn: getNavigation,
    staleTime: 1000 * 60 * 60, // 1 hour cache (BONUS)
  });

  return (
    <nav
      aria-label="Primary"
      className="bg-white border-b"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-24 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <p className="text-sm text-red-600">
            Failed to load navigation.
          </p>
        )}

        {/* Navigation Links */}
        {!isLoading && data && (
          <ul className="flex flex-wrap gap-6 text-sm font-medium">
            {data.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/category/${item.slug}`}
                  className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}

