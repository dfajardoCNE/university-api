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

export class PostDto {
  @ApiProperty({ description: 'ID de la publicación' })
  id: number;

  @ApiProperty({ description: 'Contenido de la publicación' })
  content: string;
}

export class ReportResponseDto {
  @ApiProperty({ description: 'ID del reporte' })
  id: number;

  @ApiProperty({ description: 'ID del hilo (opcional)', required: false })
  threadId?: number;

  @ApiProperty({ description: 'ID de la publicación (opcional)', required: false })
  postId?: number;

  @ApiProperty({ description: 'ID del usuario que reportó' })
  reportedBy: number;

  @ApiProperty({ description: 'Razón del reporte' })
  reason: string;

  @ApiProperty({ description: 'Estado del reporte', enum: ['pending', 'reviewing', 'resolved', 'rejected'] })
  status: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de resolución', required: false })
  resolvedAt?: Date;

  @ApiProperty({ description: 'Información del usuario que reportó', required: false })
  user?: UserDto;

  @ApiProperty({ description: 'Información del hilo reportado', required: false })
  thread?: ThreadDto;

  @ApiProperty({ description: 'Información de la publicación reportada', required: false })
  post?: PostDto;
}