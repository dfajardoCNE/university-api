import { ApiProperty } from '@nestjs/swagger';

export class CampusResponseDto {
  @ApiProperty({ description: 'ID del campus' })
  id: number;

  @ApiProperty({ description: 'Nombre del campus' })
  name: string;

  @ApiProperty({ description: 'Ubicación del campus' })
  location: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;
}