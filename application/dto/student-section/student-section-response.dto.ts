import { ApiProperty } from '@nestjs/swagger';

export class StudentSectionResponseDto {
  @ApiProperty({ description: 'ID de la inscripción' })
  id: number;

  @ApiProperty({ description: 'ID del estudiante' })
  studentId: number;

  @ApiProperty({ description: 'ID de la sección' })
  sectionId: number;

  @ApiProperty({ description: 'Calificación', required: false })
  grade?: number;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;
}