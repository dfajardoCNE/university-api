import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateDepartmentDto } from '../../../application/dto/department/create-department.dto';
import { UpdateDepartmentDto } from '../../../application/dto/department/update-department.dto';
import { DepartmentResponseDto } from '../../../application/dto/department/department-response.dto';
import { GetAllDepartmentsUseCase } from '../../../domain/use-cases/department/get-all-departments.use-case';
import { GetDepartmentByIdUseCase } from '../../../domain/use-cases/department/get-department-by-id.use-case';
import { GetDepartmentsByFacultyUseCase } from '../../../domain/use-cases/department/get-departments-by-faculty.use-case';
import { CreateDepartmentUseCase } from '../../../domain/use-cases/department/create-department.use-case';
import { UpdateDepartmentUseCase } from '../../../domain/use-cases/department/update-department.use-case';
import { DeleteDepartmentUseCase } from '../../../domain/use-cases/department/delete-department.use-case';

@ApiTags('departamentos')
@Controller('departments')
export class DepartmentController {
  constructor(
    private readonly getAllDepartmentsUseCase: GetAllDepartmentsUseCase,
    private readonly getDepartmentByIdUseCase: GetDepartmentByIdUseCase,
    private readonly getDepartmentsByFacultyUseCase: GetDepartmentsByFacultyUseCase,
    private readonly createDepartmentUseCase: CreateDepartmentUseCase,
    private readonly updateDepartmentUseCase: UpdateDepartmentUseCase,
    private readonly deleteDepartmentUseCase: DeleteDepartmentUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los departamentos' })
  @ApiResponse({ status: 200, description: 'Lista de departamentos', type: [DepartmentResponseDto] })
  async findAll(@Query('facultyId') facultyId?: string): Promise<DepartmentResponseDto[]> {
    if (facultyId) {
      return this.getDepartmentsByFacultyUseCase.execute(+facultyId);
    }
    return this.getAllDepartmentsUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un departamento por ID' })
  @ApiResponse({ status: 200, description: 'Departamento encontrado', type: DepartmentResponseDto })
  @ApiResponse({ status: 404, description: 'Departamento no encontrado' })
  async findOne(@Param('id') id: string): Promise<DepartmentResponseDto> {
    return this.getDepartmentByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo departamento' })
  @ApiResponse({ status: 201, description: 'Departamento creado', type: DepartmentResponseDto })
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<DepartmentResponseDto> {
    return this.createDepartmentUseCase.execute(createDepartmentDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un departamento' })
  @ApiResponse({ status: 200, description: 'Departamento actualizado', type: DepartmentResponseDto })
  @ApiResponse({ status: 404, description: 'Departamento no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    return this.updateDepartmentUseCase.execute(+id, updateDepartmentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un departamento' })
  @ApiResponse({ status: 200, description: 'Departamento eliminado' })
  @ApiResponse({ status: 404, description: 'Departamento no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteDepartmentUseCase.execute(+id);
  }
}