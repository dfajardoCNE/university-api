import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBuildingDto {
  @ApiProperty({ description: 'ID del campus donde se encuentra el edificio' })
  @IsNotEmpty()
  @IsNumber()
  campusId: number;

  @ApiProperty({ description: 'Nombre del edificio' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Número de pisos del edificio' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  floors: number;
}