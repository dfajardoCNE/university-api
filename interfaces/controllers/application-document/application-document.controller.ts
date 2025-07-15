import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateDocumentDto } from '../../../application/dto/application-document/create-document.dto';
import { DocumentResponseDto } from '../../../application/dto/application-document/document-response.dto';
import { GetDocumentsByApplicationUseCase } from '../../../domain/use-cases/application-document/get-documents-by-application.use-case';
import { GetDocumentByIdUseCase } from '../../../domain/use-cases/application-document/get-document-by-id.use-case';
import { CreateDocumentUseCase } from '../../../domain/use-cases/application-document/create-document.use-case';
import { DeleteDocumentUseCase } from '../../../domain/use-cases/application-document/delete-document.use-case';

@ApiTags('application-documents')
@Controller('application-documents')
export class ApplicationDocumentController {
  constructor(
    private readonly getDocumentsByApplicationUseCase: GetDocumentsByApplicationUseCase,
    private readonly getDocumentByIdUseCase: GetDocumentByIdUseCase,
    private readonly createDocumentUseCase: CreateDocumentUseCase,
    private readonly deleteDocumentUseCase: DeleteDocumentUseCase,
  ) {}

  @Get('application/:applicationId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener documentos por solicitud' })
  @ApiResponse({ status: 200, description: 'Lista de documentos', type: [DocumentResponseDto] })
  async findByApplication(@Param('applicationId') applicationId: string): Promise<DocumentResponseDto[]> {
    return this.getDocumentsByApplicationUseCase.execute(+applicationId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un documento por ID' })
  @ApiResponse({ status: 200, description: 'Documento encontrado', type: DocumentResponseDto })
  @ApiResponse({ status: 404, description: 'Documento no encontrado' })
  async findOne(@Param('id') id: string): Promise<DocumentResponseDto> {
    return this.getDocumentByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo documento' })
  @ApiResponse({ status: 201, description: 'Documento creado', type: DocumentResponseDto })
  async create(@Body() createDocumentDto: CreateDocumentDto): Promise<DocumentResponseDto> {
    return this.createDocumentUseCase.execute(createDocumentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un documento' })
  @ApiResponse({ status: 200, description: 'Documento eliminado' })
  @ApiResponse({ status: 404, description: 'Documento no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteDocumentUseCase.execute(+id);
  }
}