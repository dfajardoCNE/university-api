import { IsOptional, IsNumber, IsDate, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateSessionTimeDto {
  @ApiProperty({ description: 'Día de la semana (0: Domingo, 1: Lunes, ..., 6: Sábado)', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(6)
  dayOfWeek?: number;

  @ApiProperty({ description: 'Hora de inicio de la sesión', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startTime?: Date;

  @ApiProperty({ description: 'Hora de fin de la sesión', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endTime?: Date;
}