import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';

import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './modules/product/products.module';
import { HistoryModule } from './modules/history/history.module';
import { ScrapeModule } from './modules/scrape/scrape.module';

@Module({
  imports: [
    // Environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Redis / Queue
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),

    // Core modules
    PrismaModule,
    ProductModule,
    HistoryModule,
    ScrapeModule,
  ],
})
export class AppModule {}
