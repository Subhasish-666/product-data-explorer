'use client';

import clsx from 'clsx';

/* ---------------- Props ---------------- */

type SkeletonProps = {
  className?: string;
  rounded?: boolean;
};

/* ---------------- Component ---------------- */

export default function Skeleton({
  className,
  rounded = true,
}: SkeletonProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className={clsx(
        'animate-pulse bg-gray-200',
        rounded ? 'rounded-lg' : 'rounded',
        className,
      )}
    />
  );
}
