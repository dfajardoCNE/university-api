import { ApiProperty } from '@nestjs/swagger';

export class StudentDto {
  @ApiProperty({ description: 'ID del estudiante' })
  id: number;

  @ApiProperty({ description: 'ID de la persona' })
  personId: number;
}

export class ExamDto {
  @ApiProperty({ description: 'ID del examen' })
  id: number;

  @ApiProperty({ description: 'Título del examen' })
  title: string;
}

export class PracticeDto {
  @ApiProperty({ description: 'ID de la práctica' })
  id: number;

  @ApiProperty({ description: 'Título de la práctica' })
  title: string;
}

export class AssignmentDto {
  @ApiProperty({ description: 'ID de la tarea' })
  id: number;

  @ApiProperty({ description: 'Título de la tarea' })
  title: string;
}

export class SubmissionResponseDto {
  @ApiProperty({ description: 'ID de la entrega' })
  id: number;

  @ApiProperty({ description: 'ID del estudiante' })
  studentId: number;

  @ApiProperty({ description: 'ID del examen', required: false })
  examId?: number;

  @ApiProperty({ description: 'ID de la práctica', required: false })
  practiceId?: number;

  @ApiProperty({ description: 'ID de la tarea', required: false })
  assignmentId?: number;

  @ApiProperty({ description: 'Ruta del archivo', required: false })
  filePath?: string;

  @ApiProperty({ description: 'Calificación', required: false })
  grade?: number;

  @ApiProperty({ description: 'Retroalimentación', required: false })
  feedback?: string;

  @ApiProperty({ description: 'Fecha de entrega' })
  submittedAt: Date;

  @ApiProperty({ description: 'Información del estudiante', required: false })
  student?: StudentDto;

  @ApiProperty({ description: 'Información del examen', required: false })
  exam?: ExamDto;

  @ApiProperty({ description: 'Información de la práctica', required: false })
  practice?: PracticeDto;

  @ApiProperty({ description: 'Información de la tarea', required: false })
  assignment?: AssignmentDto;
}