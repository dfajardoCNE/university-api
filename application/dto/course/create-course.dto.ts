import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ description: 'ID de la carrera a la que pertenece el curso' })
  @IsNotEmpty()
  @IsNumber()
  careerId: number;

  @ApiProperty({ description: 'Código único del curso' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ description: 'Nombre del curso' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Número de créditos del curso' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  credits: number;
}