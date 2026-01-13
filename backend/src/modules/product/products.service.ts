import { Injectable } from '@nestjs/common';
import { ProductScraper, ScrapedProduct } from '../../scraper/product.scraper';
import { ProductDetailScraper } from '../../scraper/product-detail.scraper';

interface QueryOptions {
  cat: string;
  page: number;
  limit: number;
  q?: string;
  author?: string;
  minPrice?: number;
  maxPrice?: number;
}

@Injectable()
export class ProductService {
  constructor(
    private readonly scraper: ProductScraper,
    private readonly detail: ProductDetailScraper,
  ) {}

  async getHomepageSections(): Promise<Record<string, ScrapedProduct[]>> {
    return this.scraper.scrapeHomepageSections();
  }

  async getProductsByCategory(
    opts: QueryOptions,
  ): Promise<{
    page: number;
    limit: number;
    total: number;
    products: ScrapedProduct[];
  }> {
    let products: ScrapedProduct[] = await this.scraper.scrapeCategory(opts.cat);

    if (typeof opts.q === 'string' && opts.q.trim() !== '') {
      const q = opts.q.toLowerCase();
      products = products.filter(
        (p) => typeof p.title === 'string' && p.title.toLowerCase().includes(q),
      );
    }

    if (typeof opts.author === 'string' && opts.author.trim() !== '') {
      const a = opts.author.toLowerCase();
      products = products.filter(
        (p) => typeof p.author === 'string' && p.author.toLowerCase().includes(a),
      );
    }

if (typeof opts.minPrice === 'number') {
  const min = opts.minPrice;
  products = products.filter(
    (p) => typeof p.price === 'number' && p.price >= min,
  );
}

if (typeof opts.maxPrice === 'number') {
  const max = opts.maxPrice;
  products = products.filter(
    (p) => typeof p.price === 'number' && p.price <= max,
  );
}

    const start = (opts.page - 1) * opts.limit;

    return {
      page: opts.page,
      limit: opts.limit,
      total: products.length,
      products: products.slice(start, start + opts.limit),
    };
  }

  async getProductDetail(id: string) {
    return this.detail.scrapeProductDetail(id);
  }
}
