import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateThreadDto {
  @ApiProperty({ description: 'Título del hilo' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Contenido del hilo' })
  @IsNotEmpty()
  @IsString()
  content: string;
}