import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSectionDto {
  @ApiProperty({ description: 'ID del curso asociado a la sección' })
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @ApiProperty({ description: 'ID del profesor que imparte la sección' })
  @IsNotEmpty()
  @IsNumber()
  professorId: number;

  @ApiProperty({ description: 'ID del aula donde se imparte la sección' })
  @IsNotEmpty()
  @IsNumber()
  classroomId: number;

  @ApiProperty({ description: 'Semestre académico (ej: "2023-1")' })
  @IsNotEmpty()
  @IsString()
  semester: string;

  @ApiProperty({ description: 'Horario de la sección (ej: "Lun-Mie 10:00-12:00")' })
  @IsNotEmpty()
  @IsString()
  schedule: string;

  @ApiProperty({ description: 'Capacidad máxima de estudiantes' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  capacity: number;
}