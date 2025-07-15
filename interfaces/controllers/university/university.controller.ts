import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateUniversityDto } from '../../../application/dto/university/create-university.dto';
import { UpdateUniversityDto } from '../../../application/dto/university/update-university.dto';
import { UniversityResponseDto } from '../../../application/dto/university/university-response.dto';
import { GetAllUniversitiesUseCase } from '../../../domain/use-cases/university/get-all-universities.use-case';
import { GetUniversityByIdUseCase } from '../../../domain/use-cases/university/get-university-by-id.use-case';
import { CreateUniversityUseCase } from '../../../domain/use-cases/university/create-university.use-case';
import { UpdateUniversityUseCase } from '../../../domain/use-cases/university/update-university.use-case';
import { DeleteUniversityUseCase } from '../../../domain/use-cases/university/delete-university.use-case';

@ApiTags('universities')
@Controller('universities')
export class UniversityController {
  constructor(
    private readonly getAllUniversitiesUseCase: GetAllUniversitiesUseCase,
    private readonly getUniversityByIdUseCase: GetUniversityByIdUseCase,
    private readonly createUniversityUseCase: CreateUniversityUseCase,
    private readonly updateUniversityUseCase: UpdateUniversityUseCase,
    private readonly deleteUniversityUseCase: DeleteUniversityUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las universidades' })
  @ApiResponse({ status: 200, description: 'Lista de universidades', type: [UniversityResponseDto] })
  async findAll(): Promise<UniversityResponseDto[]> {
    return this.getAllUniversitiesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una universidad por ID' })
  @ApiResponse({ status: 200, description: 'Universidad encontrada', type: UniversityResponseDto })
  @ApiResponse({ status: 404, description: 'Universidad no encontrada' })
  async findOne(@Param('id') id: string): Promise<UniversityResponseDto> {
    return this.getUniversityByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva universidad' })
  @ApiResponse({ status: 201, description: 'Universidad creada', type: UniversityResponseDto })
  async create(@Body() createUniversityDto: CreateUniversityDto): Promise<UniversityResponseDto> {
    return this.createUniversityUseCase.execute(createUniversityDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una universidad' })
  @ApiResponse({ status: 200, description: 'Universidad actualizada', type: UniversityResponseDto })
  @ApiResponse({ status: 404, description: 'Universidad no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateUniversityDto: UpdateUniversityDto,
  ): Promise<UniversityResponseDto> {
    return this.updateUniversityUseCase.execute(+id, updateUniversityDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una universidad' })
  @ApiResponse({ status: 200, description: 'Universidad eliminada' })
  @ApiResponse({ status: 404, description: 'Universidad no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteUniversityUseCase.execute(+id);
  }
}