import { IsNotEmpty, IsString, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({ description: 'Título de la notificación' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Mensaje de la notificación' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ description: 'IDs de los usuarios destinatarios', type: [Number] })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  recipientIds: number[];
}