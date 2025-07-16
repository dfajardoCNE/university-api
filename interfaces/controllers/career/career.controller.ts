import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateCareerDto } from '../../../application/dto/career/create-career.dto';
import { UpdateCareerDto } from '../../../application/dto/career/update-career.dto';
import { CareerResponseDto } from '../../../application/dto/career/career-response.dto';
import { GetAllCareersUseCase } from '../../../domain/use-cases/career/get-all-careers.use-case';
import { GetCareerByIdUseCase } from '../../../domain/use-cases/career/get-career-by-id.use-case';
import { GetCareersByDepartmentUseCase } from '../../../domain/use-cases/career/get-careers-by-department.use-case';
import { CreateCareerUseCase } from '../../../domain/use-cases/career/create-career.use-case';
import { UpdateCareerUseCase } from '../../../domain/use-cases/career/update-career.use-case';
import { DeleteCareerUseCase } from '../../../domain/use-cases/career/delete-career.use-case';

@ApiTags('carreras')
@Controller('careers')
export class CareerController {
  constructor(
    private readonly getAllCareersUseCase: GetAllCareersUseCase,
    private readonly getCareerByIdUseCase: GetCareerByIdUseCase,
    private readonly getCareersByDepartmentUseCase: GetCareersByDepartmentUseCase,
    private readonly createCareerUseCase: CreateCareerUseCase,
    private readonly updateCareerUseCase: UpdateCareerUseCase,
    private readonly deleteCareerUseCase: DeleteCareerUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las carreras' })
  @ApiResponse({ status: 200, description: 'Lista de carreras', type: [CareerResponseDto] })
  async findAll(@Query('departmentId') departmentId?: string): Promise<CareerResponseDto[]> {
    if (departmentId) {
      return this.getCareersByDepartmentUseCase.execute(+departmentId);
    }
    return this.getAllCareersUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una carrera por ID' })
  @ApiResponse({ status: 200, description: 'Carrera encontrada', type: CareerResponseDto })
  @ApiResponse({ status: 404, description: 'Carrera no encontrada' })
  async findOne(@Param('id') id: string): Promise<CareerResponseDto> {
    return this.getCareerByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva carrera' })
  @ApiResponse({ status: 201, description: 'Carrera creada', type: CareerResponseDto })
  async create(@Body() createCareerDto: CreateCareerDto): Promise<CareerResponseDto> {
    return this.createCareerUseCase.execute(createCareerDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una carrera' })
  @ApiResponse({ status: 200, description: 'Carrera actualizada', type: CareerResponseDto })
  @ApiResponse({ status: 404, description: 'Carrera no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateCareerDto: UpdateCareerDto,
  ): Promise<CareerResponseDto> {
    return this.updateCareerUseCase.execute(+id, updateCareerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una carrera' })
  @ApiResponse({ status: 200, description: 'Carrera eliminada' })
  @ApiResponse({ status: 404, description: 'Carrera no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteCareerUseCase.execute(+id);
  }
}
