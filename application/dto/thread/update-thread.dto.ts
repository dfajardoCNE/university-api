import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateThreadDto {
  @ApiProperty({ description: 'Título del hilo', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Contenido del hilo', required: false })
  @IsOptional()
  @IsString()
  content?: string;
}