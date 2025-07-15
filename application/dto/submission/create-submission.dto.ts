import { IsNotEmpty, IsNumber, IsString, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubmissionDto {
  @ApiProperty({ description: 'ID del estudiante' })
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @ApiProperty({ description: 'ID del examen', required: false })
  @IsOptional()
  @IsNumber()
  examId?: number;

  @ApiProperty({ description: 'ID de la práctica', required: false })
  @IsOptional()
  @IsNumber()
  practiceId?: number;

  @ApiProperty({ description: 'ID de la tarea', required: false })
  @IsOptional()
  @IsNumber()
  assignmentId?: number;

  @ApiProperty({ description: 'Ruta del archivo', required: false })
  @IsOptional()
  @IsString()
  filePath?: string;
}