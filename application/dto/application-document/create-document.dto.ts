import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({ description: 'ID de la solicitud' })
  @IsNotEmpty()
  @IsNumber()
  applicationId: number;

  @ApiProperty({ description: 'Tipo de documento' })
  @IsNotEmpty()
  @IsString()
  documentType: string;

  @ApiProperty({ description: 'Ruta del archivo' })
  @IsNotEmpty()
  @IsString()
  filePath: string;
}