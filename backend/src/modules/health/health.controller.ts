import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class HealthController {
  /**
   * Root health check
   * Used for uptime checks, Docker health, CI, etc.
   */
  @Get()
  @ApiOperation({
    summary: 'Health check',
    description:
      'Returns API status to confirm backend is running',
  })
  health() {
    return {
      status: 'ok',
      service: 'product-data-explorer-backend',
      timestamp: new Date().toISOString(),
    };
  }
}
