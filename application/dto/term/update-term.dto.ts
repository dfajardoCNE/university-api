import { IsOptional, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateTermDto {
  @ApiProperty({ description: 'Nombre del período académico (ej: "2023-1")', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Fecha de inicio del período académico', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty({ description: 'Fecha de fin del período académico', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;
}