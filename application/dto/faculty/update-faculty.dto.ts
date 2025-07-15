import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFacultyDto {
  @ApiProperty({ description: 'ID de la universidad a la que pertenece la facultad', required: false })
  @IsOptional()
  @IsNumber()
  universityId?: number;

  @ApiProperty({ description: 'Nombre de la facultad', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}