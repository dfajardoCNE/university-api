import { ApiProperty } from '@nestjs/swagger';

export class CareerDto {
  @ApiProperty({ description: 'ID de la carrera' })
  id: number;

  @ApiProperty({ description: 'Nombre de la carrera' })
  name: string;
}

export class CampusDto {
  @ApiProperty({ description: 'ID del campus' })
  id: number;

  @ApiProperty({ description: 'Nombre del campus' })
  name: string;

  @ApiProperty({ description: 'Ubicación del campus' })
  location?: string;
}

export class CareerCampusResponseDto {
  @ApiProperty({ description: 'ID de la carrera' })
  careerId: number;

  @ApiProperty({ description: 'ID del campus' })
  campusId: number;

  @ApiProperty({ description: 'Información de la carrera' })
  career?: CareerDto;

  @ApiProperty({ description: 'Información del campus' })
  campus?: CampusDto;
}