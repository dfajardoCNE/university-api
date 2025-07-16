import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'Nombre del rol' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descripción del rol', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}