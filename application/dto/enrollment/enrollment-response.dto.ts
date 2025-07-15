import { ApiProperty } from '@nestjs/swagger';
import { StudentResponseDto } from '../student/student-response.dto';
import { SectionResponseDto } from '../section/section-response.dto';

export class EnrollmentResponseDto {
  @ApiProperty({ description: 'ID de la matrícula' })
  id: number;

  @ApiProperty({ description: 'Fecha de matrícula' })
  enrollmentDate: Date;

  @ApiProperty({ description: 'Calificación del estudiante', required: false })
  grade?: number;

  @ApiProperty({ description: 'Estado de la matrícula' })
  status: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Información del estudiante' })
  student: StudentResponseDto;

  @ApiProperty({ description: 'Información de la sección' })
  section: SectionResponseDto;
}