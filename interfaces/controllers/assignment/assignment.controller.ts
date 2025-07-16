import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateAssignmentDto } from '../../../application/dto/assignment/create-assignment.dto';
import { UpdateAssignmentDto } from '../../../application/dto/assignment/update-assignment.dto';
import { AssignmentResponseDto } from '../../../application/dto/assignment/assignment-response.dto';
import { GetAllAssignmentsUseCase } from '../../../domain/use-cases/assignment/get-all-assignments.use-case';
import { GetAssignmentByIdUseCase } from '../../../domain/use-cases/assignment/get-assignment-by-id.use-case';
import { GetAssignmentsByCourseUseCase } from '../../../domain/use-cases/assignment/get-assignments-by-course.use-case';
import { CreateAssignmentUseCase } from '../../../domain/use-cases/assignment/create-assignment.use-case';
import { UpdateAssignmentUseCase } from '../../../domain/use-cases/assignment/update-assignment.use-case';
import { DeleteAssignmentUseCase } from '../../../domain/use-cases/assignment/delete-assignment.use-case';

@ApiTags('tareas')
@Controller('assignments')
export class AssignmentController {
  constructor(
    private readonly getAllAssignmentsUseCase: GetAllAssignmentsUseCase,
    private readonly getAssignmentByIdUseCase: GetAssignmentByIdUseCase,
    private readonly getAssignmentsByCourseUseCase: GetAssignmentsByCourseUseCase,
    private readonly createAssignmentUseCase: CreateAssignmentUseCase,
    private readonly updateAssignmentUseCase: UpdateAssignmentUseCase,
    private readonly deleteAssignmentUseCase: DeleteAssignmentUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  @ApiResponse({ status: 200, description: 'Lista de tareas', type: [AssignmentResponseDto] })
  async findAll(
    @Query('courseId') courseId?: string,
  ): Promise<AssignmentResponseDto[]> {
    if (courseId) {
      return this.getAssignmentsByCourseUseCase.execute(+courseId);
    }
    return this.getAllAssignmentsUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiResponse({ status: 200, description: 'Tarea encontrada', type: AssignmentResponseDto })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  async findOne(@Param('id') id: string): Promise<AssignmentResponseDto> {
    return this.getAssignmentByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'professor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiResponse({ status: 201, description: 'Tarea creada', type: AssignmentResponseDto })
  async create(@Body() createAssignmentDto: CreateAssignmentDto): Promise<AssignmentResponseDto> {
    return this.createAssignmentUseCase.execute(createAssignmentDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'professor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una tarea' })
  @ApiResponse({ status: 200, description: 'Tarea actualizada', type: AssignmentResponseDto })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ): Promise<AssignmentResponseDto> {
    return this.updateAssignmentUseCase.execute(+id, updateAssignmentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'professor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @ApiResponse({ status: 200, description: 'Tarea eliminada' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteAssignmentUseCase.execute(+id);
  }
}
