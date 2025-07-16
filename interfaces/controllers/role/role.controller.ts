import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateRoleDto } from '../../../application/dto/role/create-role.dto';
import { UpdateRoleDto } from '../../../application/dto/role/update-role.dto';
import { RoleResponseDto } from '../../../application/dto/role/role-response.dto';
import { GetAllRolesUseCase } from '../../../domain/use-cases/role/get-all-roles.use-case';
import { GetRoleByIdUseCase } from '../../../domain/use-cases/role/get-role-by-id.use-case';
import { CreateRoleUseCase } from '../../../domain/use-cases/role/create-role.use-case';
import { UpdateRoleUseCase } from '../../../domain/use-cases/role/update-role.use-case';
import { DeleteRoleUseCase } from '../../../domain/use-cases/role/delete-role.use-case';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(
    private readonly getAllRolesUseCase: GetAllRolesUseCase,
    private readonly getRoleByIdUseCase: GetRoleByIdUseCase,
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los roles' })
  @ApiResponse({ status: 200, description: 'Lista de roles', type: [RoleResponseDto] })
  async findAll(): Promise<RoleResponseDto[]> {
    return this.getAllRolesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un rol por ID' })
  @ApiResponse({ status: 200, description: 'Rol encontrado', type: RoleResponseDto })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  async findOne(@Param('id') id: string): Promise<RoleResponseDto> {
    return this.getRoleByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo rol' })
  @ApiResponse({ status: 201, description: 'Rol creado', type: RoleResponseDto })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
    return this.createRoleUseCase.execute(createRoleDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un rol' })
  @ApiResponse({ status: 200, description: 'Rol actualizado', type: RoleResponseDto })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    return this.updateRoleUseCase.execute(+id, updateRoleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un rol' })
  @ApiResponse({ status: 200, description: 'Rol eliminado' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteRoleUseCase.execute(+id);
  }
}