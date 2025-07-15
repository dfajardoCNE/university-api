import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCareerDto {
  @ApiProperty({ description: 'Nombre de la carrera', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'ID del departamento al que pertenece la carrera', required: false })
  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @ApiProperty({ description: 'Descripción de la carrera', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}