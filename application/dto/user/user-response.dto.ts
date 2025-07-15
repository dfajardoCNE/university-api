import { ApiProperty } from '@nestjs/swagger';

export class PersonDto {
  @ApiProperty({ description: 'ID de la persona' })
  id: number;

  @ApiProperty({ description: 'Nombre de la persona' })
  firstName: string;

  @ApiProperty({ description: 'Apellido de la persona' })
  lastName: string;

  @ApiProperty({ description: 'Correo electrónico de la persona' })
  email: string;

  @ApiProperty({ description: 'Fecha de nacimiento', required: false })
  dateOfBirth?: Date;

  @ApiProperty({ description: 'Ruta de la foto de perfil', required: false })
  profilePhotoPath?: string;
}

export class RoleDto {
  @ApiProperty({ description: 'ID del rol' })
  id: number;

  @ApiProperty({ description: 'Nombre del rol' })
  name: string;

  @ApiProperty({ description: 'Descripción del rol', required: false })
  description?: string;
}

export class UserResponseDto {
  @ApiProperty({ description: 'ID del usuario' })
  id: number;

  @ApiProperty({ description: 'Nombre de usuario' })
  username: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Último inicio de sesión', required: false })
  lastLogin?: Date;

  @ApiProperty({ description: 'Información de la persona' })
  person: PersonDto;

  @ApiProperty({ description: 'Rol del usuario' })
  role: RoleDto;
}