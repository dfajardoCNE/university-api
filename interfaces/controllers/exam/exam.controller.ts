import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateExamDto } from '../../../application/dto/exam/create-exam.dto';
import { UpdateExamDto } from '../../../application/dto/exam/update-exam.dto';
import { ExamResponseDto } from '../../../application/dto/exam/exam-response.dto';
import { ExamMapper } from '../../../application/mappers/exam.mapper';
import { GetAllExamsUseCase } from '../../../domain/use-cases/exam/get-all-exams.use-case';
import { GetExamByIdUseCase } from '../../../domain/use-cases/exam/get-exam-by-id.use-case';
import { GetExamsByCourseUseCase } from '../../../domain/use-cases/exam/get-exams-by-course.use-case';
import { GetExamsByProfessorUseCase } from '../../../domain/use-cases/exam/get-exams-by-professor.use-case';
import { CreateExamUseCase } from '../../../domain/use-cases/exam/create-exam.use-case';
import { UpdateExamUseCase } from '../../../domain/use-cases/exam/update-exam.use-case';
import { DeleteExamUseCase } from '../../../domain/use-cases/exam/delete-exam.use-case';

@ApiTags('exámenes')
@Controller('exams')
export class ExamController {
  constructor(
    private readonly getAllExamsUseCase: GetAllExamsUseCase,
    private readonly getExamByIdUseCase: GetExamByIdUseCase,
    private readonly getExamsByCourseUseCase: GetExamsByCourseUseCase,
    private readonly getExamsByProfessorUseCase: GetExamsByProfessorUseCase,
    private readonly createExamUseCase: CreateExamUseCase,
    private readonly updateExamUseCase: UpdateExamUseCase,
    private readonly deleteExamUseCase: DeleteExamUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los exámenes' })
  @ApiResponse({ status: 200, description: 'Lista de exámenes', type: [ExamResponseDto] })
  async findAll(
    @Query('courseId') courseId?: string,
    @Query('professorId') professorId?: string,
  ): Promise<ExamResponseDto[]> {
    let exams;
    if (courseId) {
      exams = await this.getExamsByCourseUseCase.execute(+courseId);
    } else if (professorId) {
      exams = await this.getExamsByProfessorUseCase.execute(+professorId);
    } else {
      exams = await this.getAllExamsUseCase.execute();
    }
    return ExamMapper.toResponseDtoArray(exams);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un examen por ID' })
  @ApiResponse({ status: 200, description: 'Examen encontrado', type: ExamResponseDto })
  @ApiResponse({ status: 404, description: 'Examen no encontrado' })
  async findOne(@Param('id') id: string): Promise<ExamResponseDto> {
    const exam = await this.getExamByIdUseCase.execute(+id);
    return ExamMapper.toResponseDto(exam);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'professor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo examen' })
  @ApiResponse({ status: 201, description: 'Examen creado', type: ExamResponseDto })
  async create(@Body() createExamDto: CreateExamDto): Promise<ExamResponseDto> {
    const exam = await this.createExamUseCase.execute(createExamDto);
    return ExamMapper.toResponseDto(exam);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'professor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un examen' })
  @ApiResponse({ status: 200, description: 'Examen actualizado', type: ExamResponseDto })
  @ApiResponse({ status: 404, description: 'Examen no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateExamDto: UpdateExamDto,
  ): Promise<ExamResponseDto> {
    const exam = await this.updateExamUseCase.execute(+id, updateExamDto);
    return ExamMapper.toResponseDto(exam);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'professor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un examen' })
  @ApiResponse({ status: 200, description: 'Examen eliminado' })
  @ApiResponse({ status: 404, description: 'Examen no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteExamUseCase.execute(+id);
  }
}
