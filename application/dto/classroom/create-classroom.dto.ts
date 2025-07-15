import { IsNotEmpty, IsNumber, IsString, IsBoolean, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassroomDto {
  @ApiProperty({ description: 'ID del edificio donde se encuentra el aula' })
  @IsNotEmpty()
  @IsNumber()
  buildingId: number;

  @ApiProperty({ description: 'Nombre o número del aula' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Capacidad del aula' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  capacity: number;

  @ApiProperty({ description: 'Indica si el aula tiene proyector', default: false })
  @IsBoolean()
  hasProjector: boolean = false;

  @ApiProperty({ description: 'Indica si el aula tiene computadoras', default: false })
  @IsBoolean()
  hasComputers: boolean = false;
}