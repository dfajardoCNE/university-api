import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCampusDto {
  @ApiProperty({ description: 'Nombre del campus' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Ubicación del campus' })
  @IsNotEmpty()
  @IsString()
  location: string;
}