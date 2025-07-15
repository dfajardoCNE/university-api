import { ApiProperty } from '@nestjs/swagger';

export class ApplicationDto {
  @ApiProperty({ description: 'ID de la solicitud' })
  id: number;

  @ApiProperty({ description: 'ID de la persona' })
  personId: number;

  @ApiProperty({ description: 'ID de la carrera' })
  careerId: number;

  @ApiProperty({ description: 'Estado de la solicitud' })
  status: string;
}

export class DocumentResponseDto {
  @ApiProperty({ description: 'ID del documento' })
  id: number;

  @ApiProperty({ description: 'ID de la solicitud' })
  applicationId: number;

  @ApiProperty({ description: 'Tipo de documento' })
  documentType: string;

  @ApiProperty({ description: 'Ruta del archivo' })
  filePath: string;

  @ApiProperty({ description: 'Fecha de carga' })
  uploadDate: Date;

  @ApiProperty({ description: 'Información de la solicitud', required: false })
  application?: ApplicationDto;
}