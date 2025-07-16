import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateCampusDto } from '../../../application/dto/campus/create-campus.dto';
import { UpdateCampusDto } from '../../../application/dto/campus/update-campus.dto';
import { CampusResponseDto } from '../../../application/dto/campus/campus-response.dto';
import { GetAllCampusesUseCase } from '../../../domain/use-cases/campus/get-all-campuses.use-case';
import { GetCampusByIdUseCase } from '../../../domain/use-cases/campus/get-campus-by-id.use-case';
import { CreateCampusUseCase } from '../../../domain/use-cases/campus/create-campus.use-case';
import { UpdateCampusUseCase } from '../../../domain/use-cases/campus/update-campus.use-case';
import { DeleteCampusUseCase } from '../../../domain/use-cases/campus/delete-campus.use-case';

@ApiTags('campus')
@Controller('campuses')
export class CampusController {
  constructor(
    private readonly getAllCampusesUseCase: GetAllCampusesUseCase,
    private readonly getCampusByIdUseCase: GetCampusByIdUseCase,
    private readonly createCampusUseCase: CreateCampusUseCase,
    private readonly updateCampusUseCase: UpdateCampusUseCase,
    private readonly deleteCampusUseCase: DeleteCampusUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los campus' })
  @ApiResponse({ status: 200, description: 'Lista de campus', type: [CampusResponseDto] })
  async findAll(): Promise<CampusResponseDto[]> {
    return this.getAllCampusesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un campus por ID' })
  @ApiResponse({ status: 200, description: 'Campus encontrado', type: CampusResponseDto })
  @ApiResponse({ status: 404, description: 'Campus no encontrado' })
  async findOne(@Param('id') id: string): Promise<CampusResponseDto> {
    return this.getCampusByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo campus' })
  @ApiResponse({ status: 201, description: 'Campus creado', type: CampusResponseDto })
  async create(@Body() createCampusDto: CreateCampusDto): Promise<CampusResponseDto> {
    return this.createCampusUseCase.execute(createCampusDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un campus' })
  @ApiResponse({ status: 200, description: 'Campus actualizado', type: CampusResponseDto })
  @ApiResponse({ status: 404, description: 'Campus no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateCampusDto: UpdateCampusDto,
  ): Promise<CampusResponseDto> {
    return this.updateCampusUseCase.execute(+id, updateCampusDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un campus' })
  @ApiResponse({ status: 200, description: 'Campus eliminado' })
  @ApiResponse({ status: 404, description: 'Campus no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteCampusUseCase.execute(+id);
  }
}
