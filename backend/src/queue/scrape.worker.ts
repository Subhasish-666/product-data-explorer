import { chromium } from 'playwright';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

export async function scrapeCategories(
  slug: string | null,
  prisma: PrismaService,
  configService: ConfigService,
) {
  const url = slug
    ? `https://www.worldofbooks.com/en-gb/category/${slug}`
    : 'https://www.worldofbooks.com/en-gb';

  console.log(`Scraping categories from: ${url}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { timeout: 60000 });

  await page.waitForSelector('a[href*="/category/"]');

  const categories = await page.evaluate(() => {
    const links = Array.from(
      document.querySelectorAll('a[href*="/category/"]'),
    );

    const seen = new Set();
    const results: any[] = [];

    for (const link of links) {
      const title = link.textContent?.trim();
      const href = link.getAttribute('href');

      if (!title || !href) continue;

      const slug = href.split('/category/')[1]?.split('/')[0];
      if (!slug || seen.has(slug)) continue;

      seen.add(slug);

      results.push({
        title,
        slug,
      });
    }

    return results.slice(0, 30);
  });

  await browser.close();

  console.log(`Found ${categories.length} categories`);

  return categories;
}

