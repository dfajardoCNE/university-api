import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateProfessorDto } from '../../../application/dto/professor/create-professor.dto';
import { UpdateProfessorDto } from '../../../application/dto/professor/update-professor.dto';
import { ProfessorResponseDto } from '../../../application/dto/professor/professor-response.dto';
import { GetAllProfessorsUseCase } from '../../../domain/use-cases/professor/get-all-professors.use-case';
import { GetProfessorByIdUseCase } from '../../../domain/use-cases/professor/get-professor-by-id.use-case';
import { CreateProfessorUseCase } from '../../../domain/use-cases/professor/create-professor.use-case';
import { UpdateProfessorUseCase } from '../../../domain/use-cases/professor/update-professor.use-case';
import { DeleteProfessorUseCase } from '../../../domain/use-cases/professor/delete-professor.use-case';

@ApiTags('professors')
@Controller('professors')
export class ProfessorController {
  constructor(
    private readonly getAllProfessorsUseCase: GetAllProfessorsUseCase,
    private readonly getProfessorByIdUseCase: GetProfessorByIdUseCase,
    private readonly createProfessorUseCase: CreateProfessorUseCase,
    private readonly updateProfessorUseCase: UpdateProfessorUseCase,
    private readonly deleteProfessorUseCase: DeleteProfessorUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los profesores' })
  @ApiResponse({ status: 200, description: 'Lista de profesores', type: [ProfessorResponseDto] })
  async findAll(): Promise<ProfessorResponseDto[]> {
    return this.getAllProfessorsUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un profesor por ID' })
  @ApiResponse({ status: 200, description: 'Profesor encontrado', type: ProfessorResponseDto })
  @ApiResponse({ status: 404, description: 'Profesor no encontrado' })
  async findOne(@Param('id') id: string): Promise<ProfessorResponseDto> {
    return this.getProfessorByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo profesor' })
  @ApiResponse({ status: 201, description: 'Profesor creado', type: ProfessorResponseDto })
  async create(@Body() createProfessorDto: CreateProfessorDto): Promise<ProfessorResponseDto> {
    return this.createProfessorUseCase.execute(createProfessorDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un profesor' })
  @ApiResponse({ status: 200, description: 'Profesor actualizado', type: ProfessorResponseDto })
  @ApiResponse({ status: 404, description: 'Profesor no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateProfessorDto: UpdateProfessorDto,
  ): Promise<ProfessorResponseDto> {
    return this.updateProfessorUseCase.execute(+id, updateProfessorDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un profesor' })
  @ApiResponse({ status: 200, description: 'Profesor eliminado' })
  @ApiResponse({ status: 404, description: 'Profesor no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteProfessorUseCase.execute(+id);
  }
}