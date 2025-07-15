import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateBuildingDto } from '../../../application/dto/building/create-building.dto';
import { UpdateBuildingDto } from '../../../application/dto/building/update-building.dto';
import { BuildingResponseDto } from '../../../application/dto/building/building-response.dto';
import { GetAllBuildingsUseCase } from '../../../domain/use-cases/building/get-all-buildings.use-case';
import { GetBuildingByIdUseCase } from '../../../domain/use-cases/building/get-building-by-id.use-case';
import { GetBuildingsByCampusUseCase } from '../../../domain/use-cases/building/get-buildings-by-campus.use-case';
import { CreateBuildingUseCase } from '../../../domain/use-cases/building/create-building.use-case';
import { UpdateBuildingUseCase } from '../../../domain/use-cases/building/update-building.use-case';
import { DeleteBuildingUseCase } from '../../../domain/use-cases/building/delete-building.use-case';

@ApiTags('buildings')
@Controller('buildings')
export class BuildingController {
  constructor(
    private readonly getAllBuildingsUseCase: GetAllBuildingsUseCase,
    private readonly getBuildingByIdUseCase: GetBuildingByIdUseCase,
    private readonly getBuildingsByCampusUseCase: GetBuildingsByCampusUseCase,
    private readonly createBuildingUseCase: CreateBuildingUseCase,
    private readonly updateBuildingUseCase: UpdateBuildingUseCase,
    private readonly deleteBuildingUseCase: DeleteBuildingUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los edificios' })
  @ApiResponse({ status: 200, description: 'Lista de edificios', type: [BuildingResponseDto] })
  async findAll(@Query('campusId') campusId?: string): Promise<BuildingResponseDto[]> {
    if (campusId) {
      return this.getBuildingsByCampusUseCase.execute(+campusId);
    }
    return this.getAllBuildingsUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un edificio por ID' })
  @ApiResponse({ status: 200, description: 'Edificio encontrado', type: BuildingResponseDto })
  @ApiResponse({ status: 404, description: 'Edificio no encontrado' })
  async findOne(@Param('id') id: string): Promise<BuildingResponseDto> {
    return this.getBuildingByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo edificio' })
  @ApiResponse({ status: 201, description: 'Edificio creado', type: BuildingResponseDto })
  async create(@Body() createBuildingDto: CreateBuildingDto): Promise<BuildingResponseDto> {
    return this.createBuildingUseCase.execute(createBuildingDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un edificio' })
  @ApiResponse({ status: 200, description: 'Edificio actualizado', type: BuildingResponseDto })
  @ApiResponse({ status: 404, description: 'Edificio no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateBuildingDto: UpdateBuildingDto,
  ): Promise<BuildingResponseDto> {
    return this.updateBuildingUseCase.execute(+id, updateBuildingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un edificio' })
  @ApiResponse({ status: 200, description: 'Edificio eliminado' })
  @ApiResponse({ status: 404, description: 'Edificio no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteBuildingUseCase.execute(+id);
  }
}