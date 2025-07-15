import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreatePracticeDto } from '../../../application/dto/practice/create-practice.dto';
import { UpdatePracticeDto } from '../../../application/dto/practice/update-practice.dto';
import { PracticeResponseDto } from '../../../application/dto/practice/practice-response.dto';
import { GetAllPracticesUseCase } from '../../../domain/use-cases/practice/get-all-practices.use-case';
import { GetPracticeByIdUseCase } from '../../../domain/use-cases/practice/get-practice-by-id.use-case';
import { GetPracticesByCourseUseCase } from '../../../domain/use-cases/practice/get-practices-by-course.use-case';
import { CreatePracticeUseCase } from '../../../domain/use-cases/practice/create-practice.use-case';
import { UpdatePracticeUseCase } from '../../../domain/use-cases/practice/update-practice.use-case';
import { DeletePracticeUseCase } from '../../../domain/use-cases/practice/delete-practice.use-case';

@ApiTags('practices')
@Controller('practices')
export class PracticeController {
  constructor(
    private readonly getAllPracticesUseCase: GetAllPracticesUseCase,
    private readonly getPracticeByIdUseCase: GetPracticeByIdUseCase,
    private readonly getPracticesByCourseUseCase: GetPracticesByCourseUseCase,
    private readonly createPracticeUseCase: CreatePracticeUseCase,
    private readonly updatePracticeUseCase: UpdatePracticeUseCase,
    private readonly deletePracticeUseCase: DeletePracticeUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todas las prácticas' })
  @ApiResponse({ status: 200, description: 'Lista de prácticas', type: [PracticeResponseDto] })
  async findAll(
    @Query('courseId') courseId?: string,
  ): Promise<PracticeResponseDto[]> {
    if (courseId) {
      return this.getPracticesByCourseUseCase.execute(+courseId);
    }
    return this.getAllPracticesUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una práctica por ID' })
  @ApiResponse({ status: 200, description: 'Práctica encontrada', type: PracticeResponseDto })
  @ApiResponse({ status: 404, description: 'Práctica no encontrada' })
  async findOne(@Param('id') id: string): Promise<PracticeResponseDto> {
    return this.getPracticeByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'professor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva práctica' })
  @ApiResponse({ status: 201, description: 'Práctica creada', type: PracticeResponseDto })
  async create(@Body() createPracticeDto: CreatePracticeDto): Promise<PracticeResponseDto> {
    return this.createPracticeUseCase.execute(createPracticeDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'professor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una práctica' })
  @ApiResponse({ status: 200, description: 'Práctica actualizada', type: PracticeResponseDto })
  @ApiResponse({ status: 404, description: 'Práctica no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updatePracticeDto: UpdatePracticeDto,
  ): Promise<PracticeResponseDto> {
    return this.updatePracticeUseCase.execute(+id, updatePracticeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'professor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una práctica' })
  @ApiResponse({ status: 200, description: 'Práctica eliminada' })
  @ApiResponse({ status: 404, description: 'Práctica no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deletePracticeUseCase.execute(+id);
  }
}