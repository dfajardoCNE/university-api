import { IsNotEmpty, IsString, IsEmail, IsOptional, IsDate, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RegisterUserDto {
  @ApiProperty({ description: 'Nombre del usuario' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Apellido del usuario' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Nombre de usuario para iniciar sesión' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]+$/, { message: 'El nombre de usuario solo puede contener letras, números, guiones y guiones bajos' })
  username: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ description: 'Rol del usuario (admin, profesor, estudiante)', default: 'estudiante' })
  @IsNotEmpty()
  @IsString()
  roleName: string = 'estudiante';

  @ApiProperty({ description: 'Fecha de nacimiento', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfBirth?: Date;
}