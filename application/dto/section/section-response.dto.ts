import { ApiProperty } from '@nestjs/swagger';
import { CourseResponseDto } from '../course/course-response.dto';
import { ProfessorResponseDto } from '../professor/professor-response.dto';

export class ClassroomDto {
  @ApiProperty({ description: 'ID del aula' })
  id: number;

  @ApiProperty({ description: 'Nombre o número del aula' })
  name: string;

  @ApiProperty({ description: 'Capacidad del aula' })
  capacity: number;

  @ApiProperty({ description: 'ID del edificio donde se encuentra el aula' })
  buildingId: number;
}

export class SectionResponseDto {
  @ApiProperty({ description: 'ID de la sección' })
  id: number;

  @ApiProperty({ description: 'Semestre académico' })
  semester: string;

  @ApiProperty({ description: 'Horario de la sección' })
  schedule: string;

  @ApiProperty({ description: 'Capacidad máxima de estudiantes' })
  capacity: number;

  @ApiProperty({ description: 'Número de estudiantes inscritos' })
  enrolledCount: number;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Información del curso' })
  course: CourseResponseDto;

  @ApiProperty({ description: 'Información del profesor' })
  professor: ProfessorResponseDto;

  @ApiProperty({ description: 'Información del aula' })
  classroom: ClassroomDto;
}