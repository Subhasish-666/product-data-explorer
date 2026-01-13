import { IsIn, IsOptional, IsString } from 'class-validator';

export class ScrapeRequestDto {
  @IsIn([
    'navigation',
    'category',
    'product',
    'product-detail',
  ])
  targetType!: 
    | 'navigation'
    | 'category'
    | 'product'
    | 'product-detail';

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  sourceId?: string;
}
