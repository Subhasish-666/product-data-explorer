import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NavigationService } from './navigation.service';

@ApiTags('Navigation')
@Controller('/')
export class NavigationController {
  constructor(
    private readonly navigationService: NavigationService,
  ) {}

  /**
   * Get top-level navigation headings
   * Triggers scrape if data is missing or stale
   */
  @Get()
  @ApiOperation({
    summary: 'Get navigation headings',
    description:
      'Returns top-level navigation headings scraped from World of Books',
  })
  async getNavigation() {
    return this.navigationService.getNavigation();
  }
}
