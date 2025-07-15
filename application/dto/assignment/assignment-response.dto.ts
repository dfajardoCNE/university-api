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
}

export class AssignmentResponseDto {
  @ApiProperty({ description: 'ID de la tarea' })
  id: number;

  @ApiProperty({ description: 'ID del curso' })
  courseId: number;

  @ApiProperty({ description: 'ID del profesor' })
  professorId: number;

  @ApiProperty({ description: 'Título de la tarea' })
  title: string;

  @ApiProperty({ description: 'Descripción de la tarea', required: false })
  description?: string;

  @ApiProperty({ description: 'Fecha de entrega' })
  dueDate: Date;

  @ApiProperty({ description: 'Peso de la tarea en la calificación final' })
  weight: number;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Información del curso', required: false })
  course?: CourseDto;

  @ApiProperty({ description: 'Información del profesor', required: false })
  professor?: ProfessorDto;
}