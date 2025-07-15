import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateClassroomDto } from '../../../application/dto/classroom/create-classroom.dto';
import { UpdateClassroomDto } from '../../../application/dto/classroom/update-classroom.dto';
import { ClassroomResponseDto } from '../../../application/dto/classroom/classroom-response.dto';
import { GetAllClassroomsUseCase } from '../../../domain/use-cases/classroom/get-all-classrooms.use-case';
import { GetClassroomByIdUseCase } from '../../../domain/use-cases/classroom/get-classroom-by-id.use-case';
import { GetClassroomsByBuildingUseCase } from '../../../domain/use-cases/classroom/get-classrooms-by-building.use-case';
import { CreateClassroomUseCase } from '../../../domain/use-cases/classroom/create-classroom.use-case';
import { UpdateClassroomUseCase } from '../../../domain/use-cases/classroom/update-classroom.use-case';
import { DeleteClassroomUseCase } from '../../../domain/use-cases/classroom/delete-classroom.use-case';

@ApiTags('classrooms')
@Controller('classrooms')
export class ClassroomController {
  constructor(
    private readonly getAllClassroomsUseCase: GetAllClassroomsUseCase,
    private readonly getClassroomByIdUseCase: GetClassroomByIdUseCase,
    private readonly getClassroomsByBuildingUseCase: GetClassroomsByBuildingUseCase,
    private readonly createClassroomUseCase: CreateClassroomUseCase,
    private readonly updateClassroomUseCase: UpdateClassroomUseCase,
    private readonly deleteClassroomUseCase: DeleteClassroomUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las aulas' })
  @ApiResponse({ status: 200, description: 'Lista de aulas', type: [ClassroomResponseDto] })
  async findAll(@Query('buildingId') buildingId?: string): Promise<ClassroomResponseDto[]> {
    if (buildingId) {
      return this.getClassroomsByBuildingUseCase.execute(+buildingId);
    }
    return this.getAllClassroomsUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un aula por ID' })
  @ApiResponse({ status: 200, description: 'Aula encontrada', type: ClassroomResponseDto })
  @ApiResponse({ status: 404, description: 'Aula no encontrada' })
  async findOne(@Param('id') id: string): Promise<ClassroomResponseDto> {
    return this.getClassroomByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva aula' })
  @ApiResponse({ status: 201, description: 'Aula creada', type: ClassroomResponseDto })
  async create(@Body() createClassroomDto: CreateClassroomDto): Promise<ClassroomResponseDto> {
    return this.createClassroomUseCase.execute(createClassroomDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un aula' })
  @ApiResponse({ status: 200, description: 'Aula actualizada', type: ClassroomResponseDto })
  @ApiResponse({ status: 404, description: 'Aula no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
  ): Promise<ClassroomResponseDto> {
    return this.updateClassroomUseCase.execute(+id, updateClassroomDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un aula' })
  @ApiResponse({ status: 200, description: 'Aula eliminada' })
  @ApiResponse({ status: 404, description: 'Aula no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteClassroomUseCase.execute(+id);
  }
}