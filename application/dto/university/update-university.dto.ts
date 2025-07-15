import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUniversityDto {
  @ApiProperty({ description: 'Nombre de la universidad', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'País de la universidad', required: false })
  @IsOptional()
  @IsString()
  country?: string;
}