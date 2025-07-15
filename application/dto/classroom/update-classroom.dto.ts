import { IsOptional, IsNumber, IsString, IsBoolean, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClassroomDto {
  @ApiProperty({ description: 'ID del edificio donde se encuentra el aula', required: false })
  @IsOptional()
  @IsNumber()
  buildingId?: number;

  @ApiProperty({ description: 'Nombre o número del aula', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Capacidad del aula', required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;

  @ApiProperty({ description: 'Indica si el aula tiene proyector', required: false })
  @IsOptional()
  @IsBoolean()
  hasProjector?: boolean;

  @ApiProperty({ description: 'Indica si el aula tiene computadoras', required: false })
  @IsOptional()
  @IsBoolean()
  hasComputers?: boolean;
}