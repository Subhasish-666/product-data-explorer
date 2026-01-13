import { Controller, Post, Body } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';

@Controller('/history')
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
  ) {}

  @Post()
  async saveHistory(
    @Body() dto: CreateHistoryDto,
  ) {
    return this.historyService.save(
      dto.sessionId,
      dto.productId,
    );
  }
}
