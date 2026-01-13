import Link from 'next/link';

type Product = {
  source_id: string;
  title: string;
  image_url?: string;
};

type ProductDetail = {
  title?: string;
  description?: string;
  ratings_avg?: number;
  author?: string;
  recommendations?: { source_id: string; title: string }[];
};

const url = `http://localhost:3001`;

// ---------- helper ----------
async function fetchJSON(url: string) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Fetch failed');
  return res.json();
}

// ---------- page ----------
export default async function ProductsPage(props: {
  searchParams: Promise<{
    cat?: string;
    product?: string;
    q?: string;
    minPrice?: string;
    maxPrice?: string;
    author?: string;
    page?: string;
  }>;
}) {
  const params = await props.searchParams;

  /* =========================================================
     1) PRODUCT DETAIL PAGE
  ========================================================= */
  if (params.product) {
    const product: ProductDetail = await fetchJSON(
      `http://localhost:3001/products/${params.product}`,
    );

    return (
      <main className="max-w-4xl mx-auto px-6 py-10">
        <Link href="/products" className="text-blue-600 underline mb-6 block">
          ← Back
        </Link>

        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

        {product.author && (
          <p className="text-gray-600 mb-2">By {product.author}</p>
        )}

        <p className="text-gray-700 mb-6">
          {product.description || 'No description available.'}
        </p>

        {product.ratings_avg && (
          <p className="mb-6 font-semibold">
            Rating: {product.ratings_avg} ⭐
          </p>
        )}

        {Array.isArray(product.recommendations) &&
          product.recommendations.length > 0 && (
            <>
              <h2 className="text-xl font-bold mb-3">Recommendations</h2>
              <ul className="list-disc ml-6">
                {product.recommendations.map((r) => (
                  <li key={r.source_id}>
                    <Link
                      href={`/products?product=${r.source_id}`}
                      className="text-blue-600 underline"
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
      </main>
    );
  }

  /* =========================================================
     2) CATEGORY "VIEW ALL" PAGE (grid + pagination + filters)
  ========================================================= */
  if (params.cat) {
    const qs = new URLSearchParams({
      cat: params.cat,
      page: params.page || '1',
      q: params.q || '',
      minPrice: params.minPrice || '',
      maxPrice: params.maxPrice || '',
      author: params.author || '',
    });

    const data = await fetchJSON(
      `http://localhost:3001/products?${qs}`,
    );

    const products: Product[] = Array.isArray(data?.products)
      ? data.products
      : [];

    return (
      <main className="max-w-7xl mx-auto px-6 py-10">
        <Link href="/products" className="text-blue-600 underline mb-6 block">
          ← Back to categories
        </Link>

        <h1 className="text-3xl font-bold mb-6 capitalize">
          {formatCategory(params.cat)}
        </h1>

        {/* --- Filters (search + price + author) --- */}
        <form className="grid md:grid-cols-4 gap-4 mb-8">
          <input name="q" placeholder="Search title" className="border p-2" />
          <input name="author" placeholder="Author" className="border p-2" />
          <input name="minPrice" placeholder="Min price" className="border p-2" />
          <input name="maxPrice" placeholder="Max price" className="border p-2" />
          <button className="bg-black text-white py-2 col-span-full">
            Apply filters
          </button>
        </form>

        {/* --- Product grid --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {products.map((p) => (
            <Link
              key={p.source_id}
              href={`/products?product=${p.source_id}`}
              className="group"
            >
              <div className="aspect-[3/4] bg-gray-100 rounded overflow-hidden">
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                )}
              </div>
              <p className="mt-2 text-sm font-medium line-clamp-2">
                {p.title}
              </p>
            </Link>
          ))}
        </div>

        {/* --- Pagination --- */}
        <div className="flex justify-between mt-10">
          <Link
            href={`/products?cat=${params.cat}&page=${Number(params.page || 1) - 1}`}
            className="text-blue-600"
          >
            ← Previous
          </Link>

          <Link
            href={`/products?cat=${params.cat}&page=${Number(params.page || 1) + 1}`}
            className="text-blue-600"
          >
            Next →
          </Link>
        </div>
      </main>
    );
  }

  /* =========================================================
     3) HOMEPAGE WITH CATEGORY SECTIONS
  ========================================================= */
  const data = await fetchJSON('http://localhost:3001/products');

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {Object.entries(data).map(([category, group]: any) => {
        const products: Product[] = Array.isArray(group)
          ? group
          : Array.isArray(group?.products)
          ? group.products
          : [];

        if (!products.length) return null;

        return (
          <section key={category} className="mb-14">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {formatCategory(category)}
                </h2>
                <p className="text-sm text-gray-500">
                  All {formatCategory(category)}
                </p>
              </div>

              <Link
                href={`/products?cat=${category}`}
                className="text-blue-600 text-sm hover:underline"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {products.slice(0, 10).map((p) => (
                <Link
                  key={p.source_id}
                  href={`/products?product=${p.source_id}`}
                  className="group"
                >
                  <div className="aspect-[3/4] bg-gray-100 rounded overflow-hidden">
                    {p.image_url && (
                      <img
                        src={p.image_url}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    )}
                  </div>

                  <p className="mt-2 text-sm font-medium line-clamp-2">
                    {p.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}

function formatCategory(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}
