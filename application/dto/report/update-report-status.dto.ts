import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReportStatusDto {
  @ApiProperty({ description: 'Estado del reporte', enum: ['pending', 'reviewing', 'resolved', 'rejected'] })
  @IsNotEmpty()
  @IsString()
  @IsIn(['pending', 'reviewing', 'resolved', 'rejected'])
  status: string;
}