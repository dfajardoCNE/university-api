import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateStudentDto {
  @ApiProperty({ description: 'ID de la persona asociada al estudiante' })
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'ID de la carrera del estudiante' })
  @IsNotEmpty()
  @IsNumber()
  careerId: number;

  @ApiProperty({ description: 'ID del campus donde estudia' })
  @IsNotEmpty()
  @IsNumber()
  campusId: number;

  @ApiProperty({ description: 'Fecha de matrícula', default: new Date() })
  @IsDate()
  @Type(() => Date)
  enrollmentDate: Date = new Date();

  @ApiProperty({ description: 'Estado del estudiante', default: 'Active' })
  @IsString()
  status: string = 'Active';
}