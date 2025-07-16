import { Controller, Get, Post, Body, Param, UseGuards, Request, Query, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateReportDto } from '../../../application/dto/report/create-report.dto';
import { UpdateReportStatusDto } from '../../../application/dto/report/update-report-status.dto';
import { ReportResponseDto } from '../../../application/dto/report/report-response.dto';
import { GetAllReportsUseCase } from '../../../domain/use-cases/report/get-all-reports.use-case';
import { GetReportsByStatusUseCase } from '../../../domain/use-cases/report/get-reports-by-status.use-case';
import { CreateReportUseCase } from '../../../domain/use-cases/report/create-report.use-case';
import { UpdateReportStatusUseCase } from '../../../domain/use-cases/report/update-report-status.use-case';

@ApiTags('reportes')
@Controller('reports')
export class ReportController {
  constructor(
    private readonly getAllReportsUseCase: GetAllReportsUseCase,
    private readonly getReportsByStatusUseCase: GetReportsByStatusUseCase,
    private readonly createReportUseCase: CreateReportUseCase,
    private readonly updateReportStatusUseCase: UpdateReportStatusUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los reportes o filtrar por estado' })
  @ApiResponse({ status: 200, description: 'Lista de reportes', type: [ReportResponseDto] })
  async findAll(@Query('status') status?: string): Promise<ReportResponseDto[]> {
    if (status) {
      return this.getReportsByStatusUseCase.execute(status);
    }
    return this.getAllReportsUseCase.execute();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo reporte' })
  @ApiResponse({ status: 201, description: 'Reporte creado', type: ReportResponseDto })
  async create(
    @Body() createReportDto: CreateReportDto,
    @Request() req,
  ): Promise<ReportResponseDto> {
    const reportedBy = req.user.id;
    
    // Validar que se proporcione threadId o postId, pero no ambos
    if ((!createReportDto.threadId && !createReportDto.postId) || 
        (createReportDto.threadId && createReportDto.postId)) {
      throw new Error('Debe proporcionar threadId o postId, pero no ambos');
    }
    
    return this.createReportUseCase.execute({
      ...createReportDto,
      reportedBy,
    });
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar el estado de un reporte' })
  @ApiResponse({ status: 200, description: 'Estado del reporte actualizado', type: ReportResponseDto })
  @ApiResponse({ status: 404, description: 'Reporte no encontrado' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateReportStatusDto,
  ): Promise<ReportResponseDto> {
    return this.updateReportStatusUseCase.execute(+id, updateStatusDto.status);
  }
}
