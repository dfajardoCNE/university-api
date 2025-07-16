import { ApiProperty } from '@nestjs/swagger';
import { CourseResponseDto } from '../course/course-response.dto';
import { ProfessorResponseDto } from '../professor/professor-response.dto';

export class SectionResponseDto {
  @ApiProperty({ description: 'ID de la sección' })
  id: number;

  @ApiProperty({ description: 'ID del curso' })
  courseId: number;

  @ApiProperty({ description: 'ID del término' })
  termId: number;

  @ApiProperty({ description: 'ID del horario de sesión' })
  sessionTimeId: number;

  @ApiProperty({ description: 'ID del profesor' })
  professorId: number;

  @ApiProperty({ description: 'ID del aula' })
  classroomId: number;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Información del curso', required: false })
  course?: CourseResponseDto;

  @ApiProperty({ description: 'Información del profesor', required: false })
  professor?: ProfessorResponseDto;

  @ApiProperty({ description: 'Información del aula', required: false })
  classroom?: any;
}