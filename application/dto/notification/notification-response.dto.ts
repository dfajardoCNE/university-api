import { ApiProperty } from '@nestjs/swagger';

export class PersonDto {
  @ApiProperty({ description: 'ID de la persona' })
  id: number;

  @ApiProperty({ description: 'Nombre' })
  firstName: string;

  @ApiProperty({ description: 'Apellido' })
  lastName: string;
}

export class UserDto {
  @ApiProperty({ description: 'ID del usuario' })
  id: number;

  @ApiProperty({ description: 'Nombre de usuario' })
  username: string;

  @ApiProperty({ description: 'ID de la persona' })
  personId: number;

  @ApiProperty({ description: 'Información de la persona', required: false })
  person?: PersonDto;
}

export class RecipientDto {
  @ApiProperty({ description: 'ID del destinatario' })
  id: number;

  @ApiProperty({ description: 'ID del usuario' })
  userId: number;

  @ApiProperty({ description: 'Estado de lectura' })
  isRead: boolean;

  @ApiProperty({ description: 'Fecha de lectura', required: false })
  readAt?: Date;

  @ApiProperty({ description: 'Información del usuario', required: false })
  user?: UserDto;
}

export class NotificationResponseDto {
  @ApiProperty({ description: 'ID de la notificación' })
  id: number;

  @ApiProperty({ description: 'ID del usuario creador' })
  userId: number;

  @ApiProperty({ description: 'Título de la notificación' })
  title: string;

  @ApiProperty({ description: 'Mensaje de la notificación' })
  message: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Información del usuario creador', required: false })
  user?: UserDto;

  @ApiProperty({ description: 'Destinatarios de la notificación', required: false, type: [RecipientDto] })
  recipients?: RecipientDto[];
}