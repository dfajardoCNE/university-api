import { ApiProperty } from '@nestjs/swagger';
import { PersonDto } from '../user/user-response.dto';

export class CareerDto {
  @ApiProperty({ description: 'ID de la carrera' })
  id: number;

  @ApiProperty({ description: 'Nombre de la carrera' })
  name: string;
}

export class CampusDto {
  @ApiProperty({ description: 'ID del campus' })
  id: number;

  @ApiProperty({ description: 'Nombre del campus' })
  name: string;

  @ApiProperty({ description: 'Ubicación del campus' })
  location?: string;
}

export class StudentResponseDto {
  @ApiProperty({ description: 'ID del estudiante' })
  id: number;

  @ApiProperty({ description: 'Fecha de matrícula' })
  enrollmentDate: Date;

  @ApiProperty({ description: 'Estado del estudiante' })
  status: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Información de la persona' })
  person: PersonDto;

  @ApiProperty({ description: 'Información de la carrera' })
  career: CareerDto;

  @ApiProperty({ description: 'Información del campus' })
  campus: CampusDto;
}