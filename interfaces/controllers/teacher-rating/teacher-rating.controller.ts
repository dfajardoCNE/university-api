import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateRatingDto } from '../../../application/dto/teacher-rating/create-rating.dto';
import { UpdateRatingDto } from '../../../application/dto/teacher-rating/update-rating.dto';
import { RatingResponseDto } from '../../../application/dto/teacher-rating/rating-response.dto';
import { GetRatingsByProfessorUseCase } from '../../../domain/use-cases/teacher-rating/get-ratings-by-professor.use-case';
import { GetRatingsByStudentUseCase } from '../../../domain/use-cases/teacher-rating/get-ratings-by-student.use-case';
import { CreateRatingUseCase } from '../../../domain/use-cases/teacher-rating/create-rating.use-case';
import { UpdateRatingUseCase } from '../../../domain/use-cases/teacher-rating/update-rating.use-case';
import { DeleteRatingUseCase } from '../../../domain/use-cases/teacher-rating/delete-rating.use-case';

@ApiTags('teacher-ratings')
@Controller('teacher-ratings')
export class TeacherRatingController {
  constructor(
    private readonly getRatingsByProfessorUseCase: GetRatingsByProfessorUseCase,
    private readonly getRatingsByStudentUseCase: GetRatingsByStudentUseCase,
    private readonly createRatingUseCase: CreateRatingUseCase,
    private readonly updateRatingUseCase: UpdateRatingUseCase,
    private readonly deleteRatingUseCase: DeleteRatingUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener evaluaciones por profesor o estudiante' })
  @ApiResponse({ status: 200, description: 'Lista de evaluaciones', type: [RatingResponseDto] })
  async findAll(
    @Query('professorId') professorId?: string,
    @Query('studentId') studentId?: string,
  ): Promise<RatingResponseDto[]> {
    if (professorId) {
      return this.getRatingsByProfessorUseCase.execute(+professorId);
    }
    if (studentId) {
      return this.getRatingsByStudentUseCase.execute(+studentId);
    }
    throw new Error('Debe proporcionar professorId o studentId');
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva evaluación' })
  @ApiResponse({ status: 201, description: 'Evaluación creada', type: RatingResponseDto })
  async create(@Body() createRatingDto: CreateRatingDto): Promise<RatingResponseDto> {
    return this.createRatingUseCase.execute(createRatingDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una evaluación' })
  @ApiResponse({ status: 200, description: 'Evaluación actualizada', type: RatingResponseDto })
  @ApiResponse({ status: 404, description: 'Evaluación no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ): Promise<RatingResponseDto> {
    return this.updateRatingUseCase.execute(+id, updateRatingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una evaluación' })
  @ApiResponse({ status: 200, description: 'Evaluación eliminada' })
  @ApiResponse({ status: 404, description: 'Evaluación no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteRatingUseCase.execute(+id);
  }
}