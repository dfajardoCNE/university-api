import { Controller, Get, Post, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RecipientResponseDto } from '../../../application/dto/notification-recipient/recipient-response.dto';
import { NotificationRecipientService } from './notification-recipient.service';

@ApiTags('notification-recipients')
@Controller('notification-recipients')
export class NotificationRecipientController {
  constructor(private readonly recipientService: NotificationRecipientService) {}

  @Get('my')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener notificaciones recibidas por el usuario actual' })
  @ApiResponse({ status: 200, description: 'Lista de notificaciones recibidas', type: [RecipientResponseDto] })
  async findMyReceivedNotifications(@Request() req): Promise<RecipientResponseDto[]> {
    const userId = req.user.id;
    return this.recipientService.findByUser(userId);
  }

  @Post(':id/read')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Marcar una notificación como leída' })
  @ApiResponse({ status: 200, description: 'Notificación marcada como leída', type: RecipientResponseDto })
  async markAsRead(@Param('id') id: string): Promise<RecipientResponseDto> {
    return this.recipientService.markAsRead(+id);
  }
}