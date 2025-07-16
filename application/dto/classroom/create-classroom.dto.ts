import { IsNotEmpty, IsNumber, IsString, IsBoolean, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassroomDto {
  @ApiProperty({ description: 'ID del campus donde se encuentra el aula' })
  @IsNotEmpty()
  @IsNumber()
  campusId: number;

  @ApiProperty({ description: 'Nombre o número del aula' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Capacidad del aula' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  capacity: number;
}