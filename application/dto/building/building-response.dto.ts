import { ApiProperty } from '@nestjs/swagger';
import { CampusResponseDto } from '../campus/campus-response.dto';

export class BuildingResponseDto {
  @ApiProperty({ description: 'ID del edificio' })
  id: number;

  @ApiProperty({ description: 'Nombre del edificio' })
  name: string;

  @ApiProperty({ description: 'Número de pisos del edificio' })
  floors: number;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Información del campus' })
  campus: CampusResponseDto;
}