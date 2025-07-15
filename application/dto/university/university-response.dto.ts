import { ApiProperty } from '@nestjs/swagger';

export class UniversityResponseDto {
  @ApiProperty({ description: 'ID de la universidad' })
  id: number;

  @ApiProperty({ description: 'Nombre de la universidad' })
  name: string;

  @ApiProperty({ description: 'País de la universidad', required: false })
  country?: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualización', required: false })
  updatedAt?: Date;
}