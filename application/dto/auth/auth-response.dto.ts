import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'ID del usuario' })
  id: number;

  @ApiProperty({ description: 'Nombre de usuario' })
  username: string;

  @ApiProperty({ description: 'Rol del usuario' })
  role: string;

  @ApiProperty({ description: 'Información de la persona' })
  person: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export class AuthResponseDto {
  @ApiProperty({ description: 'Token de acceso JWT' })
  access_token: string;

  @ApiProperty({ description: 'Información del usuario' })
  user: UserDto;
}