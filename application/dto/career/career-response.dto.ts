import { ApiProperty } from '@nestjs/swagger';

export class DepartmentDto {
  @ApiProperty({ description: 'ID del departamento' })
  id: number;

  @ApiProperty({ description: 'Nombre del departamento' })
  name: string;

  @ApiProperty({ description: 'ID de la facultad a la que pertenece el departamento' })
  facultyId: number;
}

export class CareerResponseDto {
  @ApiProperty({ description: 'ID de la carrera' })
  id: number;

  @ApiProperty({ description: 'Nombre de la carrera' })
  name: string;

  @ApiProperty({ description: 'Descripción de la carrera', required: false })
  description?: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualización', required: false })
  updatedAt?: Date;

  @ApiProperty({ description: 'Información del departamento', required: false })
  department?: DepartmentDto;
}