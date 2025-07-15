import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCareerCampusDto {
  @ApiProperty({ description: 'ID de la carrera' })
  @IsNotEmpty()
  @IsNumber()
  careerId: number;

  @ApiProperty({ description: 'ID del campus' })
  @IsNotEmpty()
  @IsNumber()
  campusId: number;
}