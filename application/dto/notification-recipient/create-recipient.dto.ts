import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipientDto {
  @ApiProperty({ description: 'ID de la notificación' })
  @IsNotEmpty()
  @IsNumber()
  notificationId: number;

  @ApiProperty({ description: 'ID del usuario destinatario' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}