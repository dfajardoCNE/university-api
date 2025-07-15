import { IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateProfessorDto {
  @ApiProperty({ description: 'Fecha de contratación', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  hireDate?: Date;
}