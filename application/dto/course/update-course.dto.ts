import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseDto {
  @ApiProperty({ description: 'ID de la carrera a la que pertenece el curso', required: false })
  @IsOptional()
  @IsNumber()
  careerId?: number;

  @ApiProperty({ description: 'Código único del curso', required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ description: 'Nombre del curso', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Número de créditos del curso', required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  credits?: number;
}