import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateAssignmentDto {
  @ApiProperty({ description: 'ID del curso' })
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @ApiProperty({ description: 'ID del profesor' })
  @IsNotEmpty()
  @IsNumber()
  professorId: number;

  @ApiProperty({ description: 'Título de la tarea' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Descripción de la tarea', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Fecha de entrega' })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dueDate: Date;

  @ApiProperty({ description: 'Peso de la tarea en la calificación final' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  weight: number;
}