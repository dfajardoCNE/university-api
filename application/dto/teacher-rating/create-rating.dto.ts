import { IsNotEmpty, IsNumber, IsString, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRatingDto {
  @ApiProperty({ description: 'ID del estudiante' })
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @ApiProperty({ description: 'ID del profesor' })
  @IsNotEmpty()
  @IsNumber()
  professorId: number;

  @ApiProperty({ description: 'Calificación (1-5)', minimum: 1, maximum: 5 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ description: 'Comentario', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}