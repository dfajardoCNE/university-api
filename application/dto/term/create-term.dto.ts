import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateTermDto {
  @ApiProperty({ description: 'Nombre del período académico (ej: "2023-1")' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Fecha de inicio del período académico' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({ description: 'Fecha de fin del período académico' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}