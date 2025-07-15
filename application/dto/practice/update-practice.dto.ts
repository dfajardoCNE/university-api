import { IsOptional, IsString, IsDate, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdatePracticeDto {
  @ApiProperty({ description: 'Título de la práctica', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Descripción de la práctica', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Fecha de entrega', required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDate?: Date;

  @ApiProperty({ description: 'Peso de la práctica en la calificación final', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight?: number;
}