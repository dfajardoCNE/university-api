import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateExamDto {
  @ApiProperty({ description: 'ID del curso' })
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @ApiProperty({ description: 'ID del profesor' })
  @IsNotEmpty()
  @IsNumber()
  professorId: number;

  @ApiProperty({ description: 'Título del examen' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Descripción del examen', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Fecha del examen' })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  examDate: Date;

  @ApiProperty({ description: 'Duración del examen en minutos' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  duration: number;

  @ApiProperty({ description: 'Puntos totales del examen' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  totalPoints: number;
}