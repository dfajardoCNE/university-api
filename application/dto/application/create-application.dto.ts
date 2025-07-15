import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ description: 'ID de la persona que solicita' })
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'ID de la carrera solicitada' })
  @IsNotEmpty()
  @IsNumber()
  careerId: number;

  @ApiProperty({ description: 'ID del campus solicitado' })
  @IsNotEmpty()
  @IsNumber()
  campusId: number;

  @ApiProperty({ description: 'Estado de la solicitud', default: 'pendiente' })
  @IsString()
  status: string = 'pendiente';
}