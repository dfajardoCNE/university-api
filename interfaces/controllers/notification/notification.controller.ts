import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateNotificationDto } from '../../../application/dto/notification/create-notification.dto';
import { NotificationResponseDto } from '../../../application/dto/notification/notification-response.dto';
import { GetNotificationsByUserUseCase } from '../../../domain/use-cases/notification/get-notifications-by-user.use-case';
import { CreateNotificationUseCase } from '../../../domain/use-cases/notification/create-notification.use-case';
import { DeleteNotificationUseCase } from '../../../domain/use-cases/notification/delete-notification.use-case';
import { NotificationRecipientService } from '../notification-recipient/notification-recipient.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly getNotificationsByUserUseCase: GetNotificationsByUserUseCase,
    private readonly createNotificationUseCase: CreateNotificationUseCase,
    private readonly deleteNotificationUseCase: DeleteNotificationUseCase,
    private readonly notificationRecipientService: NotificationRecipientService,
  ) {}

  @Get('my')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener notificaciones del usuario actual' })
  @ApiResponse({ status: 200, description: 'Lista de notificaciones', type: [NotificationResponseDto] })
  async findMyNotifications(@Request() req): Promise<NotificationResponseDto[]> {
    const userId = req.user.id;
    return this.getNotificationsByUserUseCase.execute(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva notificación' })
  @ApiResponse({ status: 201, description: 'Notificación creada', type: NotificationResponseDto })
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
    @Request() req,
  ): Promise<NotificationResponseDto> {
    const userId = req.user.id;
    const notification = await this.createNotificationUseCase.execute({
      userId,
      title: createNotificationDto.title,
      message: createNotificationDto.message,
    });

    // Crear los destinatarios de la notificación
    for (const recipientId of createNotificationDto.recipientIds) {
      await this.notificationRecipientService.create({
        notificationId: notification.id,
        userId: recipientId,
      });
    }

    return notification;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una notificación' })
  @ApiResponse({ status: 200, description: 'Notificación eliminada' })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteNotificationUseCase.execute(+id);
  }
}