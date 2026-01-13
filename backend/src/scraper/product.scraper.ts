import { Injectable, Logger } from '@nestjs/common';
import { chromium, Page } from 'playwright';

export interface ScrapedProduct {
  title: string;
  source_id: string;
  image_url?: string | null;
  price?: number | null;
  author?: string | null;
}

const CATEGORY_URLS: Record<string, string> = {
  fiction: 'https://www.worldofbooks.com/en-gb/collections/fiction-books',
  'non-fiction': 'https://www.worldofbooks.com/en-gb/collections/non-fiction-books',
  children: 'https://www.worldofbooks.com/en-gb/collections/childrens-books',
  crime: 'https://www.worldofbooks.com/en-gb/collections/crime-thriller-books',
};

@Injectable()
export class ProductScraper {
  private readonly logger = new Logger(ProductScraper.name);

  async scrapeHomepageSections(): Promise<Record<string, ScrapedProduct[]>> {
    const browser = await chromium.launch({ headless: true });
    const results: Record<string, ScrapedProduct[]> = {};

    for (const [cat, url] of Object.entries(CATEGORY_URLS)) {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(2000);

      const products = await this.extractProducts(page);
      results[cat] = products.slice(0, 10);

      await page.close();
    }

    await browser.close();
    return results;
  }

  async scrapeCategory(cat: string): Promise<ScrapedProduct[]> {
    const url = CATEGORY_URLS[cat];
    if (!url) return [];

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2000);

    const products = await this.extractProducts(page);

    await browser.close();
    return products;
  }

  private async extractProducts(page: Page): Promise<ScrapedProduct[]> {
    return page.evaluate(() => {
      const anchors = Array.from(
        document.querySelectorAll<HTMLAnchorElement>('a[href*="/products/"]'),
      );

      const seen = new Set<string>();
      const results: ScrapedProduct[] = [];

      for (const a of anchors) {
        const href = a.getAttribute('href');
        const img = a.querySelector('img');
        const title = img?.getAttribute('alt') || a.textContent?.trim();

        if (!href || !title) continue;
        if (seen.has(href)) continue;
        seen.add(href);

        results.push({
          title: title.trim(),
          source_id: href.split('/').pop() || '',
          image_url: img?.src || null,
          price: null,
          author: null,
        });
      }

      return results;
    });
  }
}
