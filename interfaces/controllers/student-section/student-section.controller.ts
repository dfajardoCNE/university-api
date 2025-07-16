import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateStudentSectionDto } from '../../../application/dto/student-section/create-student-section.dto';
import { UpdateStudentSectionDto } from '../../../application/dto/student-section/update-student-section.dto';
import { StudentSectionResponseDto } from '../../../application/dto/student-section/student-section-response.dto';
import { GetAllStudentSectionsUseCase } from '../../../domain/use-cases/student-section/get-all-student-sections.use-case';
import { GetStudentSectionByIdUseCase } from '../../../domain/use-cases/student-section/get-student-section-by-id.use-case';
import { GetStudentSectionsByStudentUseCase } from '../../../domain/use-cases/student-section/get-student-sections-by-student.use-case';
import { GetStudentSectionsBySectionUseCase } from '../../../domain/use-cases/student-section/get-student-sections-by-section.use-case';
import { CreateStudentSectionUseCase } from '../../../domain/use-cases/student-section/create-student-section.use-case';
import { UpdateStudentSectionUseCase } from '../../../domain/use-cases/student-section/update-student-section.use-case';
import { DeleteStudentSectionUseCase } from '../../../domain/use-cases/student-section/delete-student-section.use-case';

@ApiTags('inscripciones')
@Controller('student-sections')
export class StudentSectionController {
  constructor(
    private readonly getAllStudentSectionsUseCase: GetAllStudentSectionsUseCase,
    private readonly getStudentSectionByIdUseCase: GetStudentSectionByIdUseCase,
    private readonly getStudentSectionsByStudentUseCase: GetStudentSectionsByStudentUseCase,
    private readonly getStudentSectionsBySectionUseCase: GetStudentSectionsBySectionUseCase,
    private readonly createStudentSectionUseCase: CreateStudentSectionUseCase,
    private readonly updateStudentSectionUseCase: UpdateStudentSectionUseCase,
    private readonly deleteStudentSectionUseCase: DeleteStudentSectionUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todas las inscripciones' })
  @ApiResponse({ status: 200, description: 'Lista de inscripciones', type: [StudentSectionResponseDto] })
  async findAll(
    @Query('studentId') studentId?: string,
    @Query('sectionId') sectionId?: string,
  ): Promise<StudentSectionResponseDto[]> {
    if (studentId) {
      return this.getStudentSectionsByStudentUseCase.execute(+studentId);
    }
    if (sectionId) {
      return this.getStudentSectionsBySectionUseCase.execute(+sectionId);
    }
    return this.getAllStudentSectionsUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una inscripción por ID' })
  @ApiResponse({ status: 200, description: 'Inscripción encontrada', type: StudentSectionResponseDto })
  @ApiResponse({ status: 404, description: 'Inscripción no encontrada' })
  async findOne(@Param('id') id: string): Promise<StudentSectionResponseDto> {
    return this.getStudentSectionByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'estudiante')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva inscripción' })
  @ApiResponse({ status: 201, description: 'Inscripción creada', type: StudentSectionResponseDto })
  async create(@Body() createStudentSectionDto: CreateStudentSectionDto): Promise<StudentSectionResponseDto> {
    return this.createStudentSectionUseCase.execute(createStudentSectionDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una inscripción (calificación)' })
  @ApiResponse({ status: 200, description: 'Inscripción actualizada', type: StudentSectionResponseDto })
  @ApiResponse({ status: 404, description: 'Inscripción no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateStudentSectionDto: UpdateStudentSectionDto,
  ): Promise<StudentSectionResponseDto> {
    return this.updateStudentSectionUseCase.execute(+id, updateStudentSectionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una inscripción' })
  @ApiResponse({ status: 200, description: 'Inscripción eliminada' })
  @ApiResponse({ status: 404, description: 'Inscripción no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteStudentSectionUseCase.execute(+id);
  }
}