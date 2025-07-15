import { ApiProperty } from '@nestjs/swagger';

export class SessionTimeResponseDto {
  @ApiProperty({ description: 'ID del horario de sesión' })
  id: number;

  @ApiProperty({ description: 'Día de la semana (0: Domingo, 1: Lunes, ..., 6: Sábado)' })
  dayOfWeek: number;

  @ApiProperty({ description: 'Hora de inicio de la sesión' })
  startTime: Date;

  @ApiProperty({ description: 'Hora de fin de la sesión' })
  endTime: Date;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;
}