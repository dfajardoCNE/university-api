import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateClassroomDto } from '../../../application/dto/classroom/create-classroom.dto';
import { UpdateClassroomDto } from '../../../application/dto/classroom/update-classroom.dto';
import { ClassroomResponseDto } from '../../../application/dto/classroom/classroom-response.dto';
import { ClassroomMapper } from '../../../application/mappers/classroom.mapper';
import { GetAllClassroomsUseCase } from '../../../domain/use-cases/classroom/get-all-classrooms.use-case';
import { GetClassroomByIdUseCase } from '../../../domain/use-cases/classroom/get-classroom-by-id.use-case';
import { GetClassroomsByCampusUseCase } from '../../../domain/use-cases/classroom/get-classrooms-by-campus.use-case';
import { CreateClassroomUseCase } from '../../../domain/use-cases/classroom/create-classroom.use-case';
import { UpdateClassroomUseCase } from '../../../domain/use-cases/classroom/update-classroom.use-case';
import { DeleteClassroomUseCase } from '../../../domain/use-cases/classroom/delete-classroom.use-case';

@ApiTags('aulas')
@Controller('classrooms')
export class ClassroomController {
  constructor(
    private readonly getAllClassroomsUseCase: GetAllClassroomsUseCase,
    private readonly getClassroomByIdUseCase: GetClassroomByIdUseCase,
    private readonly getClassroomsByCampusUseCase: GetClassroomsByCampusUseCase,
    private readonly createClassroomUseCase: CreateClassroomUseCase,
    private readonly updateClassroomUseCase: UpdateClassroomUseCase,
    private readonly deleteClassroomUseCase: DeleteClassroomUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las aulas' })
  @ApiResponse({ status: 200, description: 'Lista de aulas', type: [ClassroomResponseDto] })
  async findAll(@Query('campusId') campusId?: string): Promise<ClassroomResponseDto[]> {
    if (campusId) {
      const classrooms = await this.getClassroomsByCampusUseCase.execute(+campusId);
      return ClassroomMapper.toResponseDtoArray(classrooms);
    }
    const classrooms = await this.getAllClassroomsUseCase.execute();
    return ClassroomMapper.toResponseDtoArray(classrooms);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un aula por ID' })
  @ApiResponse({ status: 200, description: 'Aula encontrada', type: ClassroomResponseDto })
  @ApiResponse({ status: 404, description: 'Aula no encontrada' })
  async findOne(@Param('id') id: string): Promise<ClassroomResponseDto> {
    const classroom = await this.getClassroomByIdUseCase.execute(+id);
    return ClassroomMapper.toResponseDto(classroom);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva aula' })
  @ApiResponse({ status: 201, description: 'Aula creada', type: ClassroomResponseDto })
  async create(@Body() createClassroomDto: CreateClassroomDto): Promise<ClassroomResponseDto> {
    const classroom = await this.createClassroomUseCase.execute(createClassroomDto);
    return ClassroomMapper.toResponseDto(classroom);
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
    const classroom = await this.updateClassroomUseCase.execute(+id, updateClassroomDto);
    return ClassroomMapper.toResponseDto(classroom);
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
