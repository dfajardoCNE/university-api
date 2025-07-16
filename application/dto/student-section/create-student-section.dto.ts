import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateStudentSectionDto {
  @ApiProperty({ description: 'ID del estudiante' })
  @IsNumber()
  studentId: number;

  @ApiProperty({ description: 'ID de la sección' })
  @IsNumber()
  sectionId: number;
}