import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { createCrawler } from './crawlee.config';
import {
  log,
  PlaywrightCrawlingContext,
} from 'crawlee';

/* ---------------- Types ---------------- */

type ScrapedNavigation = {
  title: string;
  slug: string;
};

/**
 * Scrape top-level navigation headings from World of Books
 * Example: Books, Children’s Books, etc.
 */
export async function scrapeNavigation(
  prisma: PrismaService,
  configService: ConfigService,
) {
  const url = 'https://www.worldofbooks.com';

  const crawler = createCrawler(
    configService,
    async (
      context: PlaywrightCrawlingContext,
    ): Promise<void> => {
      const { page } = context;

      log.info('Scraping navigation headings');

      await page.goto(url, {
        waitUntil: 'networkidle',
      });

      /* ---------------- Extract navigation ---------------- */

      const items = await page
        .$$eval(
          'nav a',
          (links: Element[]) => {
            return links
              .map(
                (
                  link: Element,
                ): ScrapedNavigation | null => {
                  const title =
                    link.textContent?.trim() ?? '';
                  const href =
                    link.getAttribute('href') ?? '';

                  if (!title || !href) return null;

                  const slug = href
                    .split('/')
                    .filter(Boolean)
                    .pop();

                  if (!slug) return null;

                  return {
                    title,
                    slug,
                  };
                },
              )
              .filter(
                (
                  item,
                ): item is ScrapedNavigation =>
                  item !== null,
              );
          },
        )
        .catch(() => []);

      if (!items.length) {
        log.warning(
          'No navigation items found',
        );
        return;
      }

      /* ---------------- Persist to DB ---------------- */

      for (const item of items) {
        await prisma.navigation.upsert({
          where: { slug: item.slug },
          update: {
            title: item.title,
            last_scraped_at: new Date(),
          },
          create: {
            title: item.title,
            slug: item.slug,
            last_scraped_at: new Date(),
          },
        });
      }

      log.info(
        `Navigation scraped (${items.length} items)`,
      );
    },
  );

  await crawler.run([{ url }]);
}

