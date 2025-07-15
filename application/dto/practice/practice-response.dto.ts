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

export class PracticeResponseDto {
  @ApiProperty({ description: 'ID de la práctica' })
  id: number;

  @ApiProperty({ description: 'ID del curso' })
  courseId: number;

  @ApiProperty({ description: 'ID del profesor' })
  professorId: number;

  @ApiProperty({ description: 'Título de la práctica' })
  title: string;

  @ApiProperty({ description: 'Descripción de la práctica', required: false })
  description?: string;

  @ApiProperty({ description: 'Fecha de entrega' })
  dueDate: Date;

  @ApiProperty({ description: 'Peso de la práctica en la calificación final' })
  weight: number;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Información del curso', required: false })
  course?: CourseDto;

  @ApiProperty({ description: 'Información del profesor', required: false })
  professor?: ProfessorDto;
}