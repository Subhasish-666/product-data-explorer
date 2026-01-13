import { IsString } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  sessionId!: string;

  @IsString()
  productId!: string;
}

