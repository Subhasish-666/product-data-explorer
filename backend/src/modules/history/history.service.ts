import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async save(sessionId: string, productId: string) {
    return this.prisma.viewHistory.create({
  data: {
    session_id: sessionId,
    path_json: {
     productId,
      viewedAt: new Date(),
  },
}
    });
  }
}
