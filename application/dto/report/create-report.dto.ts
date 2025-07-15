import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({ description: 'ID del hilo (opcional)', required: false })
  @IsOptional()
  @IsNumber()
  threadId?: number;

  @ApiProperty({ description: 'ID de la publicación (opcional)', required: false })
  @IsOptional()
  @IsNumber()
  postId?: number;

  @ApiProperty({ description: 'Razón del reporte' })
  @IsNotEmpty()
  @IsString()
  reason: string;
}