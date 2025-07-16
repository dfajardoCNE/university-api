import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreatePersonDto } from '../../../application/dto/person/create-person.dto';
import { UpdatePersonDto } from '../../../application/dto/person/update-person.dto';
import { PersonResponseDto } from '../../../application/dto/person/person-response.dto';
import { GetAllPersonsUseCase } from '../../../domain/use-cases/person/get-all-persons.use-case';
import { GetPersonByIdUseCase } from '../../../domain/use-cases/person/get-person-by-id.use-case';
import { CreatePersonUseCase } from '../../../domain/use-cases/person/create-person.use-case';
import { UpdatePersonUseCase } from '../../../domain/use-cases/person/update-person.use-case';
import { DeletePersonUseCase } from '../../../domain/use-cases/person/delete-person.use-case';

@ApiTags('personas')
@Controller('persons')
export class PersonController {
  constructor(
    private readonly getAllPersonsUseCase: GetAllPersonsUseCase,
    private readonly getPersonByIdUseCase: GetPersonByIdUseCase,
    private readonly createPersonUseCase: CreatePersonUseCase,
    private readonly updatePersonUseCase: UpdatePersonUseCase,
    private readonly deletePersonUseCase: DeletePersonUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todas las personas' })
  @ApiResponse({ status: 200, description: 'Lista de personas', type: [PersonResponseDto] })
  async findAll(): Promise<PersonResponseDto[]> {
    return this.getAllPersonsUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una persona por ID' })
  @ApiResponse({ status: 200, description: 'Persona encontrada', type: PersonResponseDto })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  async findOne(@Param('id') id: string): Promise<PersonResponseDto> {
    return this.getPersonByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva persona' })
  @ApiResponse({ status: 201, description: 'Persona creada', type: PersonResponseDto })
  async create(@Body() createPersonDto: CreatePersonDto): Promise<PersonResponseDto> {
    return this.createPersonUseCase.execute(createPersonDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una persona' })
  @ApiResponse({ status: 200, description: 'Persona actualizada', type: PersonResponseDto })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<PersonResponseDto> {
    return this.updatePersonUseCase.execute(+id, updatePersonDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una persona' })
  @ApiResponse({ status: 200, description: 'Persona eliminada' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deletePersonUseCase.execute(+id);
  }
}