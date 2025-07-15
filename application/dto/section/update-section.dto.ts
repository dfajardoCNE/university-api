import { IsOptional, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSectionDto {
  @ApiProperty({ description: 'ID del profesor que imparte la sección', required: false })
  @IsOptional()
  @IsNumber()
  professorId?: number;

  @ApiProperty({ description: 'ID del aula donde se imparte la sección', required: false })
  @IsOptional()
  @IsNumber()
  classroomId?: number;

  @ApiProperty({ description: 'Horario de la sección (ej: "Lun-Mie 10:00-12:00")', required: false })
  @IsOptional()
  @IsString()
  schedule?: string;

  @ApiProperty({ description: 'Capacidad máxima de estudiantes', required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;
}