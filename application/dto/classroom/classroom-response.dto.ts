import { ApiProperty } from '@nestjs/swagger';

export class CampusDto {
  @ApiProperty({ description: 'ID del campus' })
  id: number;

  @ApiProperty({ description: 'Nombre del campus' })
  name: string;

  @ApiProperty({ description: 'Ubicación del campus' })
  location?: string;
}

export class ClassroomResponseDto {
  @ApiProperty({ description: 'ID del aula' })
  id: number;

  @ApiProperty({ description: 'Nombre o número del aula' })
  name: string;

  @ApiProperty({ description: 'Capacidad del aula' })
  capacity: number;

  @ApiProperty({ description: 'ID del campus' })
  campusId: number;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualización', required: false })
  updatedAt?: Date;

  @ApiProperty({ description: 'Fecha de eliminación', required: false })
  deletedAt?: Date;
}