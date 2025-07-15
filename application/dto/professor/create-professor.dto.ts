import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProfessorDto {
  @ApiProperty({ description: 'ID de la persona asociada al profesor' })
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'Fecha de contratación', default: new Date() })
  @IsDate()
  @Type(() => Date)
  hireDate: Date = new Date();
}