import { IsNotEmpty, IsNumber, IsDate, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEnrollmentDto {
  @ApiProperty({ description: 'ID del estudiante' })
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @ApiProperty({ description: 'ID de la sección' })
  @IsNotEmpty()
  @IsNumber()
  sectionId: number;

  @ApiProperty({ description: 'Fecha de matrícula', default: new Date() })
  @IsDate()
  @Type(() => Date)
  enrollmentDate: Date = new Date();

  @ApiProperty({ description: 'Estado de la matrícula', default: 'Active' })
  @IsString()
  status: string = 'Active';
}