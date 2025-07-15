import { ApiProperty } from '@nestjs/swagger';

export class CourseDto {
  @ApiProperty({ description: 'ID del curso' })
  id: number;

  @ApiProperty({ description: 'Código del curso' })
  code: string;

  @ApiProperty({ description: 'Nombre del curso' })
  name: string;

  @ApiProperty({ description: 'Créditos del curso' })
  credits: number;
}

export class CoursePrerequisiteResponseDto {
  @ApiProperty({ description: 'ID del curso' })
  courseId: number;

  @ApiProperty({ description: 'ID del curso prerrequisito' })
  prerequisiteId: number;

  @ApiProperty({ description: 'Información del curso', required: false })
  course?: CourseDto;

  @ApiProperty({ description: 'Información del curso prerrequisito', required: false })
  prerequisite?: CourseDto;
}