import { ApiProperty } from '@nestjs/swagger';

export class CourseResponseDto {
  @ApiProperty({ description: 'ID del curso' })
  id: number;

  @ApiProperty({ description: 'ID de la carrera a la que pertenece el curso' })
  careerId: number;

  @ApiProperty({ description: 'Código único del curso' })
  code: string;

  @ApiProperty({ description: 'Nombre del curso' })
  name: string;

  @ApiProperty({ description: 'Número de créditos del curso' })
  credits: number;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualización', required: false })
  updatedAt?: Date;
}