import { Injectable } from '@nestjs/common';

import type { Message } from '../../../generated/prisma/client.js';

import { PrismaService } from '../../prisma/prisma.service.js';

import type { SendMessageDto } from './dto/send-message.dto.js';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(dto: SendMessageDto): Promise<Message> {
    return this.prisma.message.create({
      data: { message: dto.text },
    });
  }
}
