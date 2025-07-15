import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubmissionDto {
  @ApiProperty({ description: 'Ruta del archivo', required: false })
  @IsOptional()
  @IsString()
  filePath?: string;

  @ApiProperty({ description: 'Calificación', required: false })
  @IsOptional()
  @IsNumber()
  grade?: number;

  @ApiProperty({ description: 'Retroalimentación', required: false })
  @IsOptional()
  @IsString()
  feedback?: string;
}