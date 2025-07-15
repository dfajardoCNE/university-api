import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateApplicationDto } from '../../../application/dto/application/create-application.dto';
import { UpdateApplicationDto } from '../../../application/dto/application/update-application.dto';
import { ApplicationResponseDto } from '../../../application/dto/application/application-response.dto';
import { GetAllApplicationsUseCase } from '../../../domain/use-cases/application/get-all-applications.use-case';
import { GetApplicationByIdUseCase } from '../../../domain/use-cases/application/get-application-by-id.use-case';
import { GetApplicationsByPersonUseCase } from '../../../domain/use-cases/application/get-applications-by-person.use-case';
import { GetApplicationsByStatusUseCase } from '../../../domain/use-cases/application/get-applications-by-status.use-case';
import { CreateApplicationUseCase } from '../../../domain/use-cases/application/create-application.use-case';
import { UpdateApplicationUseCase } from '../../../domain/use-cases/application/update-application.use-case';
import { DeleteApplicationUseCase } from '../../../domain/use-cases/application/delete-application.use-case';

@ApiTags('applications')
@Controller('applications')
export class ApplicationController {
  constructor(
    private readonly getAllApplicationsUseCase: GetAllApplicationsUseCase,
    private readonly getApplicationByIdUseCase: GetApplicationByIdUseCase,
    private readonly getApplicationsByPersonUseCase: GetApplicationsByPersonUseCase,
    private readonly getApplicationsByStatusUseCase: GetApplicationsByStatusUseCase,
    private readonly createApplicationUseCase: CreateApplicationUseCase,
    private readonly updateApplicationUseCase: UpdateApplicationUseCase,
    private readonly deleteApplicationUseCase: DeleteApplicationUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todas las solicitudes' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes', type: [ApplicationResponseDto] })
  async findAll(
    @Query('status') status?: string,
  ): Promise<ApplicationResponseDto[]> {
    if (status) {
      return this.getApplicationsByStatusUseCase.execute(status);
    }
    return this.getAllApplicationsUseCase.execute();
  }

  @Get('person/:personId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener solicitudes por persona' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes', type: [ApplicationResponseDto] })
  async findByPerson(@Param('personId') personId: string): Promise<ApplicationResponseDto[]> {
    return this.getApplicationsByPersonUseCase.execute(+personId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una solicitud por ID' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada', type: ApplicationResponseDto })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  async findOne(@Param('id') id: string): Promise<ApplicationResponseDto> {
    return this.getApplicationByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva solicitud' })
  @ApiResponse({ status: 201, description: 'Solicitud creada', type: ApplicationResponseDto })
  async create(@Body() createApplicationDto: CreateApplicationDto): Promise<ApplicationResponseDto> {
    return this.createApplicationUseCase.execute(createApplicationDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una solicitud' })
  @ApiResponse({ status: 200, description: 'Solicitud actualizada', type: ApplicationResponseDto })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ): Promise<ApplicationResponseDto> {
    return this.updateApplicationUseCase.execute(+id, updateApplicationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una solicitud' })
  @ApiResponse({ status: 200, description: 'Solicitud eliminada' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteApplicationUseCase.execute(+id);
  }
}