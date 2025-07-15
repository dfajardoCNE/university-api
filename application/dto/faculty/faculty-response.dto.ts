import { ApiProperty } from '@nestjs/swagger';

export class FacultyResponseDto {
  @ApiProperty({ description: 'ID de la facultad' })
  id: number;

  @ApiProperty({ description: 'ID de la universidad a la que pertenece la facultad' })
  universityId: number;

  @ApiProperty({ description: 'Nombre de la facultad' })
  name: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualización', required: false })
  updatedAt?: Date;
}