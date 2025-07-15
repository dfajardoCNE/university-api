import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDepartmentDto {
  @ApiProperty({ description: 'ID de la facultad a la que pertenece el departamento', required: false })
  @IsOptional()
  @IsNumber()
  facultyId?: number;

  @ApiProperty({ description: 'Nombre del departamento', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}