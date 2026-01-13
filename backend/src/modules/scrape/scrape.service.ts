import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ScrapeService {
  constructor(
    @InjectQueue('scrape-queue')
    private readonly scrapeQueue: Queue,
    private readonly configService: ConfigService,
  ) {}

  /* ---------------- Navigation ---------------- */

  async scrapeNavigation() {
    await this.scrapeQueue.add('scrape', {
      type: 'navigation',
      payload: {},
    });
  }

  /* ---------------- Categories ---------------- */

  async scrapeCategories(slug: string) {
    await this.scrapeQueue.add('scrape', {
      type: 'category',
      payload: { slug },
    });
  }

  /* ---------------- Products ---------------- */

  async scrapeProducts(slug: string) {
    await this.scrapeQueue.add('scrape', {
      type: 'products',
      payload: { slug },
    });
  }

  /* ---------------- Product Detail ---------------- */

  async scrapeProductDetail(sourceId: string) {
    await this.scrapeQueue.add('scrape', {
      type: 'product-detail',
      payload: { sourceId },
    });
  }
}
