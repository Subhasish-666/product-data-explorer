import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';
import { ProductScraper } from '../../scraper/product.scraper';
import { ProductDetailScraper } from '../../scraper/product-detail.scraper';

@Module({
  controllers: [ProductsController],
  providers: [ProductService, ProductScraper, ProductDetailScraper],
})
export class ProductModule {}
