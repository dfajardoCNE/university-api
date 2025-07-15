import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({ description: 'ID de la facultad a la que pertenece el departamento' })
  @IsNotEmpty()
  @IsNumber()
  facultyId: number;

  @ApiProperty({ description: 'Nombre del departamento' })
  @IsNotEmpty()
  @IsString()
  name: string;
}