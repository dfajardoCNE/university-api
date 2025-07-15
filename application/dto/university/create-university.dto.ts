import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUniversityDto {
  @ApiProperty({ description: 'Nombre de la universidad' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'País de la universidad', required: false })
  @IsOptional()
  @IsString()
  country?: string;
}