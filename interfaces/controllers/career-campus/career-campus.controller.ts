import { Controller, Get, Post, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateCareerCampusDto } from '../../../application/dto/career-campus/create-career-campus.dto';
import { CareerCampusResponseDto } from '../../../application/dto/career-campus/career-campus-response.dto';
import { GetAllCareerCampusesUseCase } from '../../../domain/use-cases/career-campus/get-all-career-campuses.use-case';
import { GetCareerCampusesByCareerUseCase } from '../../../domain/use-cases/career-campus/get-career-campuses-by-career.use-case';
import { GetCareerCampusesByCampusUseCase } from '../../../domain/use-cases/career-campus/get-career-campuses-by-campus.use-case';
import { CreateCareerCampusUseCase } from '../../../domain/use-cases/career-campus/create-career-campus.use-case';
import { DeleteCareerCampusUseCase } from '../../../domain/use-cases/career-campus/delete-career-campus.use-case';

@ApiTags('carreras')
@Controller('career-campuses')
export class CareerCampusController {
  constructor(
    private readonly getAllCareerCampusesUseCase: GetAllCareerCampusesUseCase,
    private readonly getCareerCampusesByCareerUseCase: GetCareerCampusesByCareerUseCase,
    private readonly getCareerCampusesByCampusUseCase: GetCareerCampusesByCampusUseCase,
    private readonly createCareerCampusUseCase: CreateCareerCampusUseCase,
    private readonly deleteCareerCampusUseCase: DeleteCareerCampusUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las relaciones carrera-campus' })
  @ApiResponse({ status: 200, description: 'Lista de relaciones carrera-campus', type: [CareerCampusResponseDto] })
  async findAll(
    @Query('careerId') careerId?: string,
    @Query('campusId') campusId?: string,
  ): Promise<CareerCampusResponseDto[]> {
    if (careerId) {
      return this.getCareerCampusesByCareerUseCase.execute(+careerId);
    }
    if (campusId) {
      return this.getCareerCampusesByCampusUseCase.execute(+campusId);
    }
    return this.getAllCareerCampusesUseCase.execute();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva relación carrera-campus' })
  @ApiResponse({ status: 201, description: 'Relación carrera-campus creada', type: CareerCampusResponseDto })
  async create(@Body() createCareerCampusDto: CreateCareerCampusDto): Promise<CareerCampusResponseDto> {
    return this.createCareerCampusUseCase.execute(createCareerCampusDto);
  }

  @Delete(':careerId/:campusId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una relación carrera-campus' })
  @ApiResponse({ status: 200, description: 'Relación carrera-campus eliminada' })
  @ApiResponse({ status: 404, description: 'Relación carrera-campus no encontrada' })
  async remove(
    @Param('careerId') careerId: string,
    @Param('campusId') campusId: string,
  ): Promise<void> {
    return this.deleteCareerCampusUseCase.execute(+careerId, +campusId);
  }
}
