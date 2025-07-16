import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateStudentDto } from '../../../application/dto/student/create-student.dto';
import { UpdateStudentDto } from '../../../application/dto/student/update-student.dto';
import { StudentResponseDto } from '../../../application/dto/student/student-response.dto';
import { StudentMapper } from '../../../application/mappers/student.mapper';
import { GetAllStudentsUseCase } from '../../../domain/use-cases/student/get-all-students.use-case';
import { GetStudentByIdUseCase } from '../../../domain/use-cases/student/get-student-by-id.use-case';
import { GetStudentsByCareerUseCase } from '../../../domain/use-cases/student/get-students-by-career.use-case';
import { CreateStudentUseCase } from '../../../domain/use-cases/student/create-student.use-case';
import { UpdateStudentUseCase } from '../../../domain/use-cases/student/update-student.use-case';
import { DeleteStudentUseCase } from '../../../domain/use-cases/student/delete-student.use-case';

@ApiTags('estudiantes')
@Controller('students')
export class StudentController {
  constructor(
    private readonly getAllStudentsUseCase: GetAllStudentsUseCase,
    private readonly getStudentByIdUseCase: GetStudentByIdUseCase,
    private readonly getStudentsByCareerUseCase: GetStudentsByCareerUseCase,
    private readonly createStudentUseCase: CreateStudentUseCase,
    private readonly updateStudentUseCase: UpdateStudentUseCase,
    private readonly deleteStudentUseCase: DeleteStudentUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los estudiantes' })
  @ApiResponse({ status: 200, description: 'Lista de estudiantes', type: [StudentResponseDto] })
  async findAll(@Query('careerId') careerId?: string): Promise<StudentResponseDto[]> {
    let students;
    if (careerId) {
      students = await this.getStudentsByCareerUseCase.execute(+careerId);
    } else {
      students = await this.getAllStudentsUseCase.execute();
    }
    return StudentMapper.toResponseDtoArray(students);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un estudiante por ID' })
  @ApiResponse({ status: 200, description: 'Estudiante encontrado', type: StudentResponseDto })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  async findOne(@Param('id') id: string): Promise<StudentResponseDto> {
    const student = await this.getStudentByIdUseCase.execute(+id);
    return StudentMapper.toResponseDto(student);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo estudiante' })
  @ApiResponse({ status: 201, description: 'Estudiante creado', type: StudentResponseDto })
  async create(@Body() createStudentDto: CreateStudentDto): Promise<StudentResponseDto> {
    const student = await this.createStudentUseCase.execute(createStudentDto);
    return StudentMapper.toResponseDto(student);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un estudiante' })
  @ApiResponse({ status: 200, description: 'Estudiante actualizado', type: StudentResponseDto })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<StudentResponseDto> {
    const student = await this.updateStudentUseCase.execute(+id, updateStudentDto);
    return StudentMapper.toResponseDto(student);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un estudiante' })
  @ApiResponse({ status: 200, description: 'Estudiante eliminado' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteStudentUseCase.execute(+id);
  }
}
