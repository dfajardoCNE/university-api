import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateTermDto } from '../../../application/dto/term/create-term.dto';
import { UpdateTermDto } from '../../../application/dto/term/update-term.dto';
import { TermResponseDto } from '../../../application/dto/term/term-response.dto';
import { GetAllTermsUseCase } from '../../../domain/use-cases/term/get-all-terms.use-case';
import { GetTermByIdUseCase } from '../../../domain/use-cases/term/get-term-by-id.use-case';
import { GetCurrentTermUseCase } from '../../../domain/use-cases/term/get-current-term.use-case';
import { CreateTermUseCase } from '../../../domain/use-cases/term/create-term.use-case';
import { UpdateTermUseCase } from '../../../domain/use-cases/term/update-term.use-case';
import { DeleteTermUseCase } from '../../../domain/use-cases/term/delete-term.use-case';

@ApiTags('terms')
@Controller('terms')
export class TermController {
  constructor(
    private readonly getAllTermsUseCase: GetAllTermsUseCase,
    private readonly getTermByIdUseCase: GetTermByIdUseCase,
    private readonly getCurrentTermUseCase: GetCurrentTermUseCase,
    private readonly createTermUseCase: CreateTermUseCase,
    private readonly updateTermUseCase: UpdateTermUseCase,
    private readonly deleteTermUseCase: DeleteTermUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los períodos académicos' })
  @ApiResponse({ status: 200, description: 'Lista de períodos académicos', type: [TermResponseDto] })
  async findAll(): Promise<TermResponseDto[]> {
    return this.getAllTermsUseCase.execute();
  }

  @Get('current')
  @ApiOperation({ summary: 'Obtener el período académico actual' })
  @ApiResponse({ status: 200, description: 'Período académico actual', type: TermResponseDto })
  @ApiResponse({ status: 404, description: 'No hay período académico actual' })
  async findCurrent(): Promise<TermResponseDto> {
    return this.getCurrentTermUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un período académico por ID' })
  @ApiResponse({ status: 200, description: 'Período académico encontrado', type: TermResponseDto })
  @ApiResponse({ status: 404, description: 'Período académico no encontrado' })
  async findOne(@Param('id') id: string): Promise<TermResponseDto> {
    return this.getTermByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo período académico' })
  @ApiResponse({ status: 201, description: 'Período académico creado', type: TermResponseDto })
  async create(@Body() createTermDto: CreateTermDto): Promise<TermResponseDto> {
    return this.createTermUseCase.execute(createTermDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un período académico' })
  @ApiResponse({ status: 200, description: 'Período académico actualizado', type: TermResponseDto })
  @ApiResponse({ status: 404, description: 'Período académico no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateTermDto: UpdateTermDto,
  ): Promise<TermResponseDto> {
    return this.updateTermUseCase.execute(+id, updateTermDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un período académico' })
  @ApiResponse({ status: 200, description: 'Período académico eliminado' })
  @ApiResponse({ status: 404, description: 'Período académico no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteTermUseCase.execute(+id);
  }
}