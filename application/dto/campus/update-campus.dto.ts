import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCampusDto {
  @ApiProperty({ description: 'Nombre del campus', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Ubicación del campus', required: false })
  @IsOptional()
  @IsString()
  location?: string;
}