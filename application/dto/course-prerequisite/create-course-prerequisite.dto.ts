import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoursePrerequisiteDto {
  @ApiProperty({ description: 'ID del curso' })
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @ApiProperty({ description: 'ID del curso prerrequisito' })
  @IsNotEmpty()
  @IsNumber()
  prerequisiteId: number;
}