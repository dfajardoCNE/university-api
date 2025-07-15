import { ApiProperty } from '@nestjs/swagger';

export class DepartmentResponseDto {
  @ApiProperty({ description: 'ID del departamento' })
  id: number;

  @ApiProperty({ description: 'ID de la facultad a la que pertenece el departamento' })
  facultyId: number;

  @ApiProperty({ description: 'Nombre del departamento' })
  name: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualización', required: false })
  updatedAt?: Date;
}