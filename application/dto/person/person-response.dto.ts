import { ApiProperty } from '@nestjs/swagger';

export class PersonResponseDto {
  @ApiProperty({ description: 'ID de la persona' })
  id: number;

  @ApiProperty({ description: 'Nombre de la persona' })
  firstName: string;

  @ApiProperty({ description: 'Apellido de la persona' })
  lastName: string;

  @ApiProperty({ description: 'Correo electrónico' })
  email: string;

  @ApiProperty({ description: 'Fecha de nacimiento', required: false })
  dateOfBirth?: Date;

  @ApiProperty({ description: 'Ruta de la foto de perfil', required: false })
  profilePhotoPath?: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;
}