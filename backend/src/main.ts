import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;

  /* ---------------- CORS ---------------- */
  app.enableCors({
    origin: [
      'http://localhost:3000', // frontend
    ],
    credentials: true,
  });

  /* ---------------- Global Validation ---------------- */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // strip unknown fields
      forbidNonWhitelisted: true, // reject invalid payloads
      transform: true,            // auto-transform DTOs
    }),
  );

  /* ---------------- Swagger (BONUS) ---------------- */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Product Data Explorer API')
    .setDescription(
      'Backend API for scraping and serving product data from World of Books',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup('api/docs', app, document);

  /* ---------------- Start Server ---------------- */
  await app.listen(port);

  console.log(
    `Backend running on http://localhost:${port}`,
  );
  console.log(
    `Swagger docs at http://localhost:${port}/api/docs`,
  );
}

bootstrap();
