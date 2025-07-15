import { IsOptional, IsNumber, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateStudentDto {
  @ApiProperty({ description: 'ID de la carrera del estudiante', required: false })
  @IsOptional()
  @IsNumber()
  careerId?: number;

  @ApiProperty({ description: 'ID del campus donde estudia', required: false })
  @IsOptional()
  @IsNumber()
  campusId?: number;

  @ApiProperty({ description: 'Estado del estudiante', required: false })
  @IsOptional()
  @IsString()
  status?: string;
}