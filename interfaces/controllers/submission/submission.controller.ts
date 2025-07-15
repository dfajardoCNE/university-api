import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateSubmissionDto } from '../../../application/dto/submission/create-submission.dto';
import { UpdateSubmissionDto } from '../../../application/dto/submission/update-submission.dto';
import { SubmissionResponseDto } from '../../../application/dto/submission/submission-response.dto';
import { GetAllSubmissionsUseCase } from '../../../domain/use-cases/submission/get-all-submissions.use-case';
import { GetSubmissionByIdUseCase } from '../../../domain/use-cases/submission/get-submission-by-id.use-case';
import { GetSubmissionsByStudentUseCase } from '../../../domain/use-cases/submission/get-submissions-by-student.use-case';
import { GetSubmissionsByAssignmentUseCase } from '../../../domain/use-cases/submission/get-submissions-by-assignment.use-case';
import { CreateSubmissionUseCase } from '../../../domain/use-cases/submission/create-submission.use-case';
import { UpdateSubmissionUseCase } from '../../../domain/use-cases/submission/update-submission.use-case';
import { DeleteSubmissionUseCase } from '../../../domain/use-cases/submission/delete-submission.use-case';

@ApiTags('submissions')
@Controller('submissions')
export class SubmissionController {
  constructor(
    private readonly getAllSubmissionsUseCase: GetAllSubmissionsUseCase,
    private readonly getSubmissionByIdUseCase: GetSubmissionByIdUseCase,
    private readonly getSubmissionsByStudentUseCase: GetSubmissionsByStudentUseCase,
    private readonly getSubmissionsByAssignmentUseCase: GetSubmissionsByAssignmentUseCase,
    private readonly createSubmissionUseCase: CreateSubmissionUseCase,
    private readonly updateSubmissionUseCase: UpdateSubmissionUseCase,
    private readonly deleteSubmissionUseCase: DeleteSubmissionUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'professor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todas las entregas' })
  @ApiResponse({ status: 200, description: 'Lista de entregas', type: [SubmissionResponseDto] })
  async findAll(
    @Query('studentId') studentId?: string,
    @Query('assignmentId') assignmentId?: string,
  ): Promise<SubmissionResponseDto[]> {
    if (studentId) {
      return this.getSubmissionsByStudentUseCase.execute(+studentId);
    }
    if (assignmentId) {
      return this.getSubmissionsByAssignmentUseCase.execute(+assignmentId);
    }
    return this.getAllSubmissionsUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una entrega por ID' })
  @ApiResponse({ status: 200, description: 'Entrega encontrada', type: SubmissionResponseDto })
  @ApiResponse({ status: 404, description: 'Entrega no encontrada' })
  async findOne(@Param('id') id: string): Promise<SubmissionResponseDto> {
    return this.getSubmissionByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva entrega' })
  @ApiResponse({ status: 201, description: 'Entrega creada', type: SubmissionResponseDto })
  async create(@Body() createSubmissionDto: CreateSubmissionDto): Promise<SubmissionResponseDto> {
    return this.createSubmissionUseCase.execute(createSubmissionDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una entrega' })
  @ApiResponse({ status: 200, description: 'Entrega actualizada', type: SubmissionResponseDto })
  @ApiResponse({ status: 404, description: 'Entrega no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateSubmissionDto: UpdateSubmissionDto,
  ): Promise<SubmissionResponseDto> {
    return this.updateSubmissionUseCase.execute(+id, updateSubmissionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una entrega' })
  @ApiResponse({ status: 200, description: 'Entrega eliminada' })
  @ApiResponse({ status: 404, description: 'Entrega no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteSubmissionUseCase.execute(+id);
  }
}