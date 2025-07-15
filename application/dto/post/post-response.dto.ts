import { ApiProperty } from '@nestjs/swagger';

export class PersonDto {
  @ApiProperty({ description: 'ID de la persona' })
  id: number;

  @ApiProperty({ description: 'Nombre' })
  firstName: string;

  @ApiProperty({ description: 'Apellido' })
  lastName: string;
}

export class UserDto {
  @ApiProperty({ description: 'ID del usuario' })
  id: number;

  @ApiProperty({ description: 'Nombre de usuario' })
  username: string;

  @ApiProperty({ description: 'ID de la persona' })
  personId: number;

  @ApiProperty({ description: 'Información de la persona', required: false })
  person?: PersonDto;
}

export class ThreadDto {
  @ApiProperty({ description: 'ID del hilo' })
  id: number;

  @ApiProperty({ description: 'Título del hilo' })
  title: string;
}

export class PostResponseDto {
  @ApiProperty({ description: 'ID de la publicación' })
  id: number;

  @ApiProperty({ description: 'ID del hilo' })
  threadId: number;

  @ApiProperty({ description: 'ID del usuario' })
  userId: number;

  @ApiProperty({ description: 'Contenido de la publicación' })
  content: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualización', required: false })
  updatedAt?: Date;

  @ApiProperty({ description: 'Información del usuario', required: false })
  user?: UserDto;

  @ApiProperty({ description: 'Información del hilo', required: false })
  thread?: ThreadDto;
}