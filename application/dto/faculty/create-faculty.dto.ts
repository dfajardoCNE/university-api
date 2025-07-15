import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFacultyDto {
  @ApiProperty({ description: 'ID de la universidad a la que pertenece la facultad' })
  @IsNotEmpty()
  @IsNumber()
  universityId: number;

  @ApiProperty({ description: 'Nombre de la facultad' })
  @IsNotEmpty()
  @IsString()
  name: string;
}