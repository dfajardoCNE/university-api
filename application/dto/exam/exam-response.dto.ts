import { ApiProperty } from '@nestjs/swagger';

export class CourseDto {
  @ApiProperty({ description: 'ID del curso' })
  id: number;

  @ApiProperty({ description: 'Código del curso' })
  code: string;

  @ApiProperty({ description: 'Nombre del curso' })
  name: string;
}

export class ProfessorDto {
  @ApiProperty({ description: 'ID del profesor' })
  id: number;

  @ApiProperty({ description: 'ID de la persona' })
  personId: number;

  @ApiProperty({ description: 'Fecha de contratación' })
  hireDate: Date;
}

export class ExamResponseDto {
  @ApiProperty({ description: 'ID del examen' })
  id: number;

  @ApiProperty({ description: 'ID del curso' })
  courseId: number;

  @ApiProperty({ description: 'ID del profesor' })
  professorId: number;

  @ApiProperty({ description: 'Título del examen' })
  title: string;

  @ApiProperty({ description: 'Descripción del examen', required: false })
  description?: string;

  @ApiProperty({ description: 'Fecha del examen' })
  examDate: Date;

  @ApiProperty({ description: 'Duración del examen en minutos' })
  duration: number;

  @ApiProperty({ description: 'Puntos totales del examen' })
  totalPoints: number;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualización', required: false })
  updatedAt?: Date;

  @ApiProperty({ description: 'Información del curso', required: false })
  course?: CourseDto;

  @ApiProperty({ description: 'Información del profesor', required: false })
  professor?: ProfessorDto;
}