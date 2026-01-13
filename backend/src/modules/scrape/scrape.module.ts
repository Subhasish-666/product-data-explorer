import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from '@nestjs/config';

import { ScrapeService } from './scrape.service';
import { ScrapeController } from './scrape.controller';

@Module({
  imports: [
    ConfigModule,

    BullModule.registerQueue({
      name: 'scrape-queue',
    }),
  ],
  controllers: [ScrapeController],
  providers: [ScrapeService],
  exports: [ScrapeService],
})
export class ScrapeModule {}
