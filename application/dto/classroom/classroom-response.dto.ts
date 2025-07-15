import { ApiProperty } from '@nestjs/swagger';

export class BuildingDto {
  @ApiProperty({ description: 'ID del edificio' })
  id: number;

  @ApiProperty({ description: 'Nombre del edificio' })
  name: string;

  @ApiProperty({ description: 'ID del campus donde se encuentra el edificio' })
  campusId: number;
}

export class ClassroomResponseDto {
  @ApiProperty({ description: 'ID del aula' })
  id: number;

  @ApiProperty({ description: 'Nombre o número del aula' })
  name: string;

  @ApiProperty({ description: 'Capacidad del aula' })
  capacity: number;

  @ApiProperty({ description: 'Indica si el aula tiene proyector' })
  hasProjector: boolean;

  @ApiProperty({ description: 'Indica si el aula tiene computadoras' })
  hasComputers: boolean;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Información del edificio' })
  building: BuildingDto;
}