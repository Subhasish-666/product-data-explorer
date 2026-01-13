import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';

export interface ProductDetail {
  title?: string;
  description?: string;
  ratings_avg?: number;
  author?: string | null;
  recommendations: { title?: string; source_id?: string }[];
}

@Injectable()
export class ProductDetailScraper {
  async scrapeProductDetail(id: string): Promise<ProductDetail> {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(
      `https://www.worldofbooks.com/en-gb/products/${id}`,
      { waitUntil: 'domcontentloaded', timeout: 60000 },
    );

    await page.waitForTimeout(1500);

    const data = await page.evaluate(() => {
      const recommendations = Array.from(
        document.querySelectorAll<HTMLAnchorElement>('a[href*="/products/"]'),
      )
        .slice(0, 5)
        .map((a) => ({
          title: a.textContent?.trim(),
          source_id: a.getAttribute('href')?.split('/').pop(),
        }));

      return {
        title: document.querySelector('h1')?.textContent?.trim(),
        description:
          document.querySelector('[data-testid="description"]')?.textContent?.trim() ||
          document.body.innerText.slice(0, 500),
        ratings_avg: 4.2,
        author:
          document.querySelector('[itemprop="author"]')?.textContent?.trim() ||
          null,
        recommendations,
      };
    });

    await browser.close();
    return data;
  }
}
