import { IsOptional, IsString, IsDate, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateExamDto {
  @ApiProperty({ description: 'Título del examen', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Descripción del examen', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Fecha del examen', required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  examDate?: Date;

  @ApiProperty({ description: 'Duración del examen en minutos', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  duration?: number;

  @ApiProperty({ description: 'Puntos totales del examen', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  totalPoints?: number;
}