import { Controller, Post, Body } from '@nestjs/common';
import { ScrapeService } from './scrape.service';
import { ScrapeRequestDto } from './dto/scrape-request.dto';

@Controller('/scrape')
export class ScrapeController {
  constructor(
    private readonly scrapeService: ScrapeService,
  ) {}

  @Post()
  async triggerScrape(
    @Body() dto: ScrapeRequestDto,
  ) {
    switch (dto.targetType) {
      case 'navigation':
        return this.scrapeService.scrapeNavigation();

      case 'category':
        if (!dto.slug) {
          throw new Error('slug is required');
        }
        return this.scrapeService.scrapeCategories(
          dto.slug,
        );

      case 'product':
        if (!dto.slug) {
          throw new Error('slug is required');
        }
        return this.scrapeService.scrapeProducts(
          dto.slug,
        );

      case 'product-detail':
        if (!dto.sourceId) {
          throw new Error('sourceId is required');
        }
        return this.scrapeService.scrapeProductDetail(
          dto.sourceId,
        );
    }
  }
}

