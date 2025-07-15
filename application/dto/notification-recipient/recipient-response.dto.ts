import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto {
  @ApiProperty({ description: 'ID de la notificación' })
  id: number;

  @ApiProperty({ description: 'Título de la notificación' })
  title: string;

  @ApiProperty({ description: 'Mensaje de la notificación' })
  message: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;
}

export class RecipientResponseDto {
  @ApiProperty({ description: 'ID del destinatario' })
  id: number;

  @ApiProperty({ description: 'ID de la notificación' })
  notificationId: number;

  @ApiProperty({ description: 'ID del usuario' })
  userId: number;

  @ApiProperty({ description: 'Estado de lectura' })
  isRead: boolean;

  @ApiProperty({ description: 'Fecha de lectura', required: false })
  readAt?: Date;

  @ApiProperty({ description: 'Información de la notificación', required: false })
  notification?: NotificationDto;
}