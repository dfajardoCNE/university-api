import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: 'ID del hilo' })
  @IsNotEmpty()
  @IsNumber()
  threadId: number;

  @ApiProperty({ description: 'Contenido de la publicación' })
  @IsNotEmpty()
  @IsString()
  content: string;
}