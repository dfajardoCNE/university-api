import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateThreadDto } from '../../../application/dto/thread/create-thread.dto';
import { UpdateThreadDto } from '../../../application/dto/thread/update-thread.dto';
import { ThreadResponseDto } from '../../../application/dto/thread/thread-response.dto';
import { GetAllThreadsUseCase } from '../../../domain/use-cases/thread/get-all-threads.use-case';
import { GetThreadByIdUseCase } from '../../../domain/use-cases/thread/get-thread-by-id.use-case';
import { GetThreadsByUserUseCase } from '../../../domain/use-cases/thread/get-threads-by-user.use-case';
import { CreateThreadUseCase } from '../../../domain/use-cases/thread/create-thread.use-case';
import { UpdateThreadUseCase } from '../../../domain/use-cases/thread/update-thread.use-case';
import { DeleteThreadUseCase } from '../../../domain/use-cases/thread/delete-thread.use-case';

@ApiTags('foros')
@Controller('threads')
export class ThreadController {
  constructor(
    private readonly getAllThreadsUseCase: GetAllThreadsUseCase,
    private readonly getThreadByIdUseCase: GetThreadByIdUseCase,
    private readonly getThreadsByUserUseCase: GetThreadsByUserUseCase,
    private readonly createThreadUseCase: CreateThreadUseCase,
    private readonly updateThreadUseCase: UpdateThreadUseCase,
    private readonly deleteThreadUseCase: DeleteThreadUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los hilos o por usuario' })
  @ApiResponse({ status: 200, description: 'Lista de hilos', type: [ThreadResponseDto] })
  async findAll(@Query('userId') userId?: string): Promise<ThreadResponseDto[]> {
    if (userId) {
      return this.getThreadsByUserUseCase.execute(+userId);
    }
    return this.getAllThreadsUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un hilo por ID' })
  @ApiResponse({ status: 200, description: 'Hilo encontrado', type: ThreadResponseDto })
  @ApiResponse({ status: 404, description: 'Hilo no encontrado' })
  async findOne(@Param('id') id: string): Promise<ThreadResponseDto> {
    return this.getThreadByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo hilo' })
  @ApiResponse({ status: 201, description: 'Hilo creado', type: ThreadResponseDto })
  async create(
    @Body() createThreadDto: CreateThreadDto,
    @Request() req,
  ): Promise<ThreadResponseDto> {
    const userId = req.user.id;
    return this.createThreadUseCase.execute({
      ...createThreadDto,
      userId,
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un hilo' })
  @ApiResponse({ status: 200, description: 'Hilo actualizado', type: ThreadResponseDto })
  @ApiResponse({ status: 404, description: 'Hilo no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateThreadDto: UpdateThreadDto,
  ): Promise<ThreadResponseDto> {
    return this.updateThreadUseCase.execute(+id, updateThreadDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un hilo' })
  @ApiResponse({ status: 200, description: 'Hilo eliminado' })
  @ApiResponse({ status: 404, description: 'Hilo no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteThreadUseCase.execute(+id);
  }
}