import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateSectionDto } from '../../../application/dto/section/create-section.dto';
import { UpdateSectionDto } from '../../../application/dto/section/update-section.dto';
import { SectionResponseDto } from '../../../application/dto/section/section-response.dto';
import { SectionMapper } from '../../../application/mappers/section.mapper';
import { GetAllSectionsUseCase } from '../../../domain/use-cases/section/get-all-sections.use-case';
import { GetSectionByIdUseCase } from '../../../domain/use-cases/section/get-section-by-id.use-case';
import { GetSectionsByCourseUseCase } from '../../../domain/use-cases/section/get-sections-by-course.use-case';
import { GetSectionsByProfessorUseCase } from '../../../domain/use-cases/section/get-sections-by-professor.use-case';
import { CreateSectionUseCase } from '../../../domain/use-cases/section/create-section.use-case';
import { UpdateSectionUseCase } from '../../../domain/use-cases/section/update-section.use-case';
import { DeleteSectionUseCase } from '../../../domain/use-cases/section/delete-section.use-case';

@ApiTags('secciones')
@Controller('sections')
export class SectionController {
  constructor(
    private readonly getAllSectionsUseCase: GetAllSectionsUseCase,
    private readonly getSectionByIdUseCase: GetSectionByIdUseCase,
    private readonly getSectionsByCourseUseCase: GetSectionsByCourseUseCase,
    private readonly getSectionsByProfessorUseCase: GetSectionsByProfessorUseCase,
    private readonly createSectionUseCase: CreateSectionUseCase,
    private readonly updateSectionUseCase: UpdateSectionUseCase,
    private readonly deleteSectionUseCase: DeleteSectionUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las secciones' })
  @ApiResponse({ status: 200, description: 'Lista de secciones', type: [SectionResponseDto] })
  async findAll(
    @Query('courseId') courseId?: string,
    @Query('professorId') professorId?: string,
  ): Promise<SectionResponseDto[]> {
    let sections;
    if (courseId) {
      sections = await this.getSectionsByCourseUseCase.execute(+courseId);
    } else if (professorId) {
      sections = await this.getSectionsByProfessorUseCase.execute(+professorId);
    } else {
      sections = await this.getAllSectionsUseCase.execute();
    }
    return SectionMapper.toResponseDtoArray(sections);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sección por ID' })
  @ApiResponse({ status: 200, description: 'Sección encontrada', type: SectionResponseDto })
  @ApiResponse({ status: 404, description: 'Sección no encontrada' })
  async findOne(@Param('id') id: string): Promise<SectionResponseDto> {
    const section = await this.getSectionByIdUseCase.execute(+id);
    return SectionMapper.toResponseDto(section);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva sección' })
  @ApiResponse({ status: 201, description: 'Sección creada', type: SectionResponseDto })
  async create(@Body() createSectionDto: CreateSectionDto): Promise<SectionResponseDto> {
    const section = await this.createSectionUseCase.execute(createSectionDto);
    return SectionMapper.toResponseDto(section);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una sección' })
  @ApiResponse({ status: 200, description: 'Sección actualizada', type: SectionResponseDto })
  @ApiResponse({ status: 404, description: 'Sección no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ): Promise<SectionResponseDto> {
    const section = await this.updateSectionUseCase.execute(+id, updateSectionDto);
    return SectionMapper.toResponseDto(section);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una sección' })
  @ApiResponse({ status: 200, description: 'Sección eliminada' })
  @ApiResponse({ status: 404, description: 'Sección no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteSectionUseCase.execute(+id);
  }
}
