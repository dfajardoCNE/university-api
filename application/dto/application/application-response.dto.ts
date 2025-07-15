import { ApiProperty } from '@nestjs/swagger';

export class PersonDto {
  @ApiProperty({ description: 'ID de la persona' })
  id: number;

  @ApiProperty({ description: 'Nombre de la persona' })
  firstName: string;

  @ApiProperty({ description: 'Apellido de la persona' })
  lastName: string;

  @ApiProperty({ description: 'Email de la persona' })
  email: string;
}

export class CareerDto {
  @ApiProperty({ description: 'ID de la carrera' })
  id: number;

  @ApiProperty({ description: 'Nombre de la carrera' })
  name: string;
}

export class DocumentDto {
  @ApiProperty({ description: 'ID del documento' })
  id: number;

  @ApiProperty({ description: 'Tipo de documento' })
  documentType: string;

  @ApiProperty({ description: 'Ruta del archivo' })
  filePath: string;

  @ApiProperty({ description: 'Fecha de carga' })
  uploadDate: Date;
}

export class ApplicationResponseDto {
  @ApiProperty({ description: 'ID de la solicitud' })
  id: number;

  @ApiProperty({ description: 'ID de la persona' })
  personId: number;

  @ApiProperty({ description: 'ID de la carrera' })
  careerId: number;

  @ApiProperty({ description: 'ID del campus' })
  campusId: number;

  @ApiProperty({ description: 'Fecha de solicitud' })
  applicationDate: Date;

  @ApiProperty({ description: 'Estado de la solicitud' })
  status: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Información de la persona', required: false })
  person?: PersonDto;

  @ApiProperty({ description: 'Información de la carrera', required: false })
  career?: CareerDto;

  @ApiProperty({ description: 'Documentos de la solicitud', type: [DocumentDto], required: false })
  documents?: DocumentDto[];
}