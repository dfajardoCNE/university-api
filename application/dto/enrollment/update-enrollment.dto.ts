import { IsOptional, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEnrollmentDto {
  @ApiProperty({ description: 'Estado de la matrícula', required: false })
  @IsOptional()
  @IsString()
  status?: string;
}