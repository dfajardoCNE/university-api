import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateCourseDto } from '../../../application/dto/course/create-course.dto';
import { UpdateCourseDto } from '../../../application/dto/course/update-course.dto';
import { CourseResponseDto } from '../../../application/dto/course/course-response.dto';
import { GetAllCoursesUseCase } from '../../../domain/use-cases/course/get-all-courses.use-case';
import { GetCourseByIdUseCase } from '../../../domain/use-cases/course/get-course-by-id.use-case';
import { GetCoursesByCareerUseCase } from '../../../domain/use-cases/course/get-courses-by-career.use-case';
import { CreateCourseUseCase } from '../../../domain/use-cases/course/create-course.use-case';
import { UpdateCourseUseCase } from '../../../domain/use-cases/course/update-course.use-case';
import { DeleteCourseUseCase } from '../../../domain/use-cases/course/delete-course.use-case';

@ApiTags('cursos')
@Controller('courses')
export class CourseController {
  constructor(
    private readonly getAllCoursesUseCase: GetAllCoursesUseCase,
    private readonly getCourseByIdUseCase: GetCourseByIdUseCase,
    private readonly getCoursesByCareerUseCase: GetCoursesByCareerUseCase,
    private readonly createCourseUseCase: CreateCourseUseCase,
    private readonly updateCourseUseCase: UpdateCourseUseCase,
    private readonly deleteCourseUseCase: DeleteCourseUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los cursos' })
  @ApiResponse({ status: 200, description: 'Lista de cursos', type: [CourseResponseDto] })
  async findAll(@Query('careerId') careerId?: string): Promise<CourseResponseDto[]> {
    if (careerId) {
      return this.getCoursesByCareerUseCase.execute(+careerId);
    }
    return this.getAllCoursesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un curso por ID' })
  @ApiResponse({ status: 200, description: 'Curso encontrado', type: CourseResponseDto })
  @ApiResponse({ status: 404, description: 'Curso no encontrado' })
  async findOne(@Param('id') id: string): Promise<CourseResponseDto> {
    return this.getCourseByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo curso' })
  @ApiResponse({ status: 201, description: 'Curso creado', type: CourseResponseDto })
  async create(@Body() createCourseDto: CreateCourseDto): Promise<CourseResponseDto> {
    return this.createCourseUseCase.execute(createCourseDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un curso' })
  @ApiResponse({ status: 200, description: 'Curso actualizado', type: CourseResponseDto })
  @ApiResponse({ status: 404, description: 'Curso no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResponseDto> {
    return this.updateCourseUseCase.execute(+id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un curso' })
  @ApiResponse({ status: 200, description: 'Curso eliminado' })
  @ApiResponse({ status: 404, description: 'Curso no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteCourseUseCase.execute(+id);
  }
}
