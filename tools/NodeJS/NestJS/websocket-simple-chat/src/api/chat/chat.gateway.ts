import { UsePipes, ValidationPipe } from '@nestjs/common';
import type { Server } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type { Socket } from 'socket.io';

import { ChatService } from './chat.service.js';

import { SendMessageDto } from './dto/send-message.dto.js';

@WebSocketGateway()
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private readonly server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('send-message')
  async senMessage(@MessageBody() dto: SendMessageDto) {
    const saved = await this.chatService.sendMessage(dto);

    this.server.emit('chat-message', {
      id: saved.id,
      message: saved.message,
    });

    return saved;
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
