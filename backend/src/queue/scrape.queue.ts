import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ConfigService } from '@nestjs/config';

type ScrapeJob =
  | {
      type: 'product';
      sourceId: string;
    }
  | {
      type: 'category';
      slug: string;
    }
  | {
      type: 'navigation';
    };

@Injectable()
export class ScrapeQueue implements OnModuleDestroy {
  private readonly queue: Queue<ScrapeJob>;

  constructor(private readonly config: ConfigService) {
    this.queue = new Queue<ScrapeJob>('scrape-queue', {
      connection: {
        host: this.config.get('REDIS_HOST') || 'localhost',
        port: Number(this.config.get('REDIS_PORT')) || 6379,
      },
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 3000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      },
    });
  }

  /* ---------------- Enqueue Product Detail ---------------- */

  async enqueueProduct(sourceId: string) {
    return this.queue.add(
      `product:${sourceId}`, // job name (idempotent)
      {
        type: 'product',
        sourceId,
      },
      {
        jobId: `product:${sourceId}`, // prevents duplicates
      },
    );
  }

  /* ---------------- Enqueue Category Products ---------------- */

  async enqueueCategory(slug: string) {
    return this.queue.add(
      `category:${slug}`,
      {
        type: 'category',
        slug,
      },
      {
        jobId: `category:${slug}`, // prevents duplicates
      },
    );
  }

  /* ---------------- Enqueue Navigation ---------------- */

  async enqueueNavigation() {
    return this.queue.add(
      'navigation',
      { type: 'navigation' },
      {
        jobId: 'navigation',
      },
    );
  }

  /* ---------------- Graceful Shutdown ---------------- */

  async onModuleDestroy() {
    await this.queue.close();
  }
}
