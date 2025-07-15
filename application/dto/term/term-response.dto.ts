import { ApiProperty } from '@nestjs/swagger';

export class TermResponseDto {
  @ApiProperty({ description: 'ID del período académico' })
  id: number;

  @ApiProperty({ description: 'Nombre del período académico' })
  name: string;

  @ApiProperty({ description: 'Fecha de inicio del período académico' })
  startDate: Date;

  @ApiProperty({ description: 'Fecha de fin del período académico' })
  endDate: Date;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualización', required: false })
  updatedAt?: Date;
}