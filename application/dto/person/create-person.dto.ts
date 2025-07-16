import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({ description: 'Nombre de la persona' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Apellido de la persona' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Correo electrónico' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Fecha de nacimiento', required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({ description: 'Ruta de la foto de perfil', required: false })
  @IsOptional()
  @IsString()
  profilePhotoPath?: string;
}