import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreatePostDto } from '../../../application/dto/post/create-post.dto';
import { UpdatePostDto } from '../../../application/dto/post/update-post.dto';
import { PostResponseDto } from '../../../application/dto/post/post-response.dto';
import { GetPostsByThreadUseCase } from '../../../domain/use-cases/post/get-posts-by-thread.use-case';
import { GetPostByIdUseCase } from '../../../domain/use-cases/post/get-post-by-id.use-case';
import { CreatePostUseCase } from '../../../domain/use-cases/post/create-post.use-case';
import { UpdatePostUseCase } from '../../../domain/use-cases/post/update-post.use-case';
import { DeletePostUseCase } from '../../../domain/use-cases/post/delete-post.use-case';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly getPostsByThreadUseCase: GetPostsByThreadUseCase,
    private readonly getPostByIdUseCase: GetPostByIdUseCase,
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener publicaciones por hilo' })
  @ApiResponse({ status: 200, description: 'Lista de publicaciones', type: [PostResponseDto] })
  async findAll(@Query('threadId') threadId: string): Promise<PostResponseDto[]> {
    if (!threadId) {
      throw new Error('Debe proporcionar threadId');
    }
    return this.getPostsByThreadUseCase.execute(+threadId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una publicación por ID' })
  @ApiResponse({ status: 200, description: 'Publicación encontrada', type: PostResponseDto })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada' })
  async findOne(@Param('id') id: string): Promise<PostResponseDto> {
    return this.getPostByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva publicación' })
  @ApiResponse({ status: 201, description: 'Publicación creada', type: PostResponseDto })
  async create(
    @Body() createPostDto: CreatePostDto,
    @Request() req,
  ): Promise<PostResponseDto> {
    const userId = req.user.id;
    return this.createPostUseCase.execute({
      ...createPostDto,
      userId,
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una publicación' })
  @ApiResponse({ status: 200, description: 'Publicación actualizada', type: PostResponseDto })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostResponseDto> {
    return this.updatePostUseCase.execute(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una publicación' })
  @ApiResponse({ status: 200, description: 'Publicación eliminada' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deletePostUseCase.execute(+id);
  }
}