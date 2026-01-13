import {
  PlaywrightCrawler,
  PlaywrightCrawlingContext,
  log,
} from 'crawlee';
import { ConfigService } from '@nestjs/config';

export function createCrawler(
  configService: ConfigService,
  requestHandler: (
    context: PlaywrightCrawlingContext,
  ) => Promise<void>,
) {
  return new PlaywrightCrawler({
    maxRequestsPerMinute: 30,
    requestHandlerTimeoutSecs: 120,

    async requestHandler(context) {
      await requestHandler(context);
    },

    async failedRequestHandler(
      context: PlaywrightCrawlingContext,
    ) {
      const { request, error } = context;

      const message =
        error instanceof Error
          ? error.message
          : String(error ?? 'Unknown error');

      log.error(
        `Request failed ${request.url}: ${message}`,
      );
    },
  });
}
