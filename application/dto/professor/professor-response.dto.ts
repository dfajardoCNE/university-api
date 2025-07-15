import { ApiProperty } from '@nestjs/swagger';
import { PersonDto } from '../user/user-response.dto';

export class ProfessorResponseDto {
  @ApiProperty({ description: 'ID del profesor' })
  id: number;

  @ApiProperty({ description: 'Fecha de contratación' })
  hireDate: Date;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Información de la persona' })
  person: PersonDto;
}