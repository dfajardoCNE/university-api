import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateEnrollmentDto } from '../../../application/dto/enrollment/create-enrollment.dto';
import { UpdateEnrollmentDto } from '../../../application/dto/enrollment/update-enrollment.dto';
import { UpdateGradeDto } from '../../../application/dto/enrollment/update-grade.dto';
import { EnrollmentResponseDto } from '../../../application/dto/enrollment/enrollment-response.dto';
import { GetAllEnrollmentsUseCase } from '../../../domain/use-cases/enrollment/get-all-enrollments.use-case';
import { GetEnrollmentByIdUseCase } from '../../../domain/use-cases/enrollment/get-enrollment-by-id.use-case';
import { GetEnrollmentsByStudentUseCase } from '../../../domain/use-cases/enrollment/get-enrollments-by-student.use-case';
import { GetEnrollmentsBySectionUseCase } from '../../../domain/use-cases/enrollment/get-enrollments-by-section.use-case';
import { CreateEnrollmentUseCase } from '../../../domain/use-cases/enrollment/create-enrollment.use-case';
import { UpdateEnrollmentUseCase } from '../../../domain/use-cases/enrollment/update-enrollment.use-case';
import { UpdateGradeUseCase } from '../../../domain/use-cases/enrollment/update-grade.use-case';
import { DeleteEnrollmentUseCase } from '../../../domain/use-cases/enrollment/delete-enrollment.use-case';

@ApiTags('enrollments')
@Controller('enrollments')
export class EnrollmentController {
  constructor(
    private readonly getAllEnrollmentsUseCase: GetAllEnrollmentsUseCase,
    private readonly getEnrollmentByIdUseCase: GetEnrollmentByIdUseCase,
    private readonly getEnrollmentsByStudentUseCase: GetEnrollmentsByStudentUseCase,
    private readonly getEnrollmentsBySectionUseCase: GetEnrollmentsBySectionUseCase,
    private readonly createEnrollmentUseCase: CreateEnrollmentUseCase,
    private readonly updateEnrollmentUseCase: UpdateEnrollmentUseCase,
    private readonly updateGradeUseCase: UpdateGradeUseCase,
    private readonly deleteEnrollmentUseCase: DeleteEnrollmentUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todas las matrículas' })
  @ApiResponse({ status: 200, description: 'Lista de matrículas', type: [EnrollmentResponseDto] })
  async findAll(
    @Query('studentId') studentId?: string,
    @Query('sectionId') sectionId?: string,
  ): Promise<EnrollmentResponseDto[]> {
    if (studentId) {
      return this.getEnrollmentsByStudentUseCase.execute(+studentId);
    }
    if (sectionId) {
      return this.getEnrollmentsBySectionUseCase.execute(+sectionId);
    }
    return this.getAllEnrollmentsUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una matrícula por ID' })
  @ApiResponse({ status: 200, description: 'Matrícula encontrada', type: EnrollmentResponseDto })
  @ApiResponse({ status: 404, description: 'Matrícula no encontrada' })
  async findOne(@Param('id') id: string): Promise<EnrollmentResponseDto> {
    return this.getEnrollmentByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'estudiante')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva matrícula' })
  @ApiResponse({ status: 201, description: 'Matrícula creada', type: EnrollmentResponseDto })
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto): Promise<EnrollmentResponseDto> {
    return this.createEnrollmentUseCase.execute(createEnrollmentDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una matrícula' })
  @ApiResponse({ status: 200, description: 'Matrícula actualizada', type: EnrollmentResponseDto })
  @ApiResponse({ status: 404, description: 'Matrícula no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<EnrollmentResponseDto> {
    return this.updateEnrollmentUseCase.execute(+id, updateEnrollmentDto);
  }

  @Patch(':id/grade')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar la calificación de una matrícula' })
  @ApiResponse({ status: 200, description: 'Calificación actualizada', type: EnrollmentResponseDto })
  @ApiResponse({ status: 404, description: 'Matrícula no encontrada' })
  async updateGrade(
    @Param('id') id: string,
    @Body() updateGradeDto: UpdateGradeDto,
  ): Promise<EnrollmentResponseDto> {
    return this.updateGradeUseCase.execute(+id, updateGradeDto.grade);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una matrícula' })
  @ApiResponse({ status: 200, description: 'Matrícula eliminada' })
  @ApiResponse({ status: 404, description: 'Matrícula no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteEnrollmentUseCase.execute(+id);
  }
}