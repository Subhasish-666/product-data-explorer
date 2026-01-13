import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductService) {}

  @Get()
  browse(
    @Query('cat') cat?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query('q') q?: string,
    @Query('author') author?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    if (!cat) return this.service.getHomepageSections();

    return this.service.getProductsByCategory({
      cat,
      page: Number(page),
      limit: Number(limit),
      q,
      author,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.service.getProductDetail(id);
  }
}
