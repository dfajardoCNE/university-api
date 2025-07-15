import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto {
  @ApiProperty({ description: 'Estado de la solicitud', required: false })
  @IsOptional()
  @IsString()
  status?: string;
}