import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { ValidatePrerequisitesUseCase } from '../../../domain/use-cases/student-section/validate-prerequisites.use-case';

@ApiTags('prerrequisitos')
@Controller('prerequisites')
export class ValidatePrerequisitesController {
  constructor(
    private readonly validatePrerequisitesUseCase: ValidatePrerequisitesUseCase,
  ) {}

  @Get('validate/:studentId/:sectionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Validar prerrequisitos para inscripción' })
  @ApiResponse({ status: 200, description: 'Resultado de la validación de prerrequisitos' })
  async validate(
    @Param('studentId') studentId: string,
    @Param('sectionId') sectionId: string,
  ) {
    return this.validatePrerequisitesUseCase.execute(+studentId, +sectionId);
  }
}