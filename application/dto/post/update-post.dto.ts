import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({ description: 'Contenido de la publicación', required: false })
  @IsOptional()
  @IsString()
  content?: string;
}