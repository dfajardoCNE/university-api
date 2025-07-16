import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateStudentSectionDto {
  @ApiProperty({ description: 'Calificación del estudiante', required: false })
  @IsOptional()
  @IsNumber()
  grade?: number;
}