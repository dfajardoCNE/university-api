import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CalculateStudentGpaUseCase } from '../../../domain/use-cases/student/calculate-student-gpa.use-case';
import { UpdateAcademicStatusUseCase } from '../../../domain/use-cases/student/update-academic-status.use-case';

@ApiTags('estado-academico')
@Controller('academic')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AcademicStatusController {
  constructor(
    private readonly calculateStudentGpaUseCase: CalculateStudentGpaUseCase,
    private readonly updateAcademicStatusUseCase: UpdateAcademicStatusUseCase,
  ) {}

  @Get('gpa/:studentId')
  @Roles('admin', 'professor', 'student')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Calcular GPA de un estudiante' })
  @ApiResponse({ status: 200, description: 'GPA calculado' })
  async calculateGpa(@Param('studentId') studentId: string) {
    return this.calculateStudentGpaUseCase.execute(+studentId);
  }

  @Get('status/:studentId')
  @Roles('admin', 'professor', 'student')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener estado académico de un estudiante' })
  @ApiResponse({ status: 200, description: 'Estado académico' })
  async getAcademicStatus(@Param('studentId') studentId: string) {
    return this.updateAcademicStatusUseCase.execute(+studentId);
  }
}