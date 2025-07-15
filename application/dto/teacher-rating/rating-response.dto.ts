import { ApiProperty } from '@nestjs/swagger';

export class PersonDto {
  @ApiProperty({ description: 'ID de la persona' })
  id: number;

  @ApiProperty({ description: 'Nombre' })
  firstName: string;

  @ApiProperty({ description: 'Apellido' })
  lastName: string;
}

export class StudentDto {
  @ApiProperty({ description: 'ID del estudiante' })
  id: number;

  @ApiProperty({ description: 'ID de la persona' })
  personId: number;

  @ApiProperty({ description: 'Información de la persona', required: false })
  person?: PersonDto;
}

export class ProfessorDto {
  @ApiProperty({ description: 'ID del profesor' })
  id: number;

  @ApiProperty({ description: 'ID de la persona' })
  personId: number;

  @ApiProperty({ description: 'Información de la persona', required: false })
  person?: PersonDto;
}

export class RatingResponseDto {
  @ApiProperty({ description: 'ID de la evaluación' })
  id: number;

  @ApiProperty({ description: 'ID del estudiante' })
  studentId: number;

  @ApiProperty({ description: 'ID del profesor' })
  professorId: number;

  @ApiProperty({ description: 'Calificación (1-5)' })
  rating: number;

  @ApiProperty({ description: 'Comentario', required: false })
  comment?: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Información del estudiante', required: false })
  student?: StudentDto;

  @ApiProperty({ description: 'Información del profesor', required: false })
  professor?: ProfessorDto;
}