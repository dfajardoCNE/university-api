import { IsOptional, IsString, IsEmail, IsDate, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty({ description: 'Nombre del usuario', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ description: 'Apellido del usuario', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ description: 'Correo electrónico del usuario', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Nombre de usuario para iniciar sesión', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]+$/, { message: 'El nombre de usuario solo puede contener letras, números, guiones y guiones bajos' })
  username?: string;

  @ApiProperty({ description: 'Contraseña del usuario', required: false })
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @ApiProperty({ description: 'Fecha de nacimiento', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfBirth?: Date;

  @ApiProperty({ description: 'Ruta de la foto de perfil', required: false })
  @IsOptional()
  @IsString()
  profilePhotoPath?: string;
}