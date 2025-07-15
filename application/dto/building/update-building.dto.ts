import { IsOptional, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBuildingDto {
  @ApiProperty({ description: 'ID del campus donde se encuentra el edificio', required: false })
  @IsOptional()
  @IsNumber()
  campusId?: number;

  @ApiProperty({ description: 'Nombre del edificio', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Número de pisos del edificio', required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  floors?: number;
}