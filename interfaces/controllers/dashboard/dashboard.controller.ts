import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetStudentDashboardUseCase } from '../../../domain/use-cases/dashboard/get-student-dashboard.use-case';
import { GetProfessorDashboardUseCase } from '../../../domain/use-cases/dashboard/get-professor-dashboard.use-case';
import { GetAdminDashboardUseCase } from '../../../domain/use-cases/dashboard/get-admin-dashboard.use-case';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(
    private readonly getStudentDashboardUseCase: GetStudentDashboardUseCase,
    private readonly getProfessorDashboardUseCase: GetProfessorDashboardUseCase,
    private readonly getAdminDashboardUseCase: GetAdminDashboardUseCase,
  ) {}

  @Get('student/:id')
  @Roles('student', 'admin')
  async getStudentDashboard(@Param('id') id: string) {
    return this.getStudentDashboardUseCase.execute(+id);
  }

  @Get('professor/:id')
  @Roles('professor', 'admin')
  async getProfessorDashboard(@Param('id') id: string) {
    return this.getProfessorDashboardUseCase.execute(+id);
  }

  @Get('admin')
  @Roles('admin')
  async getAdminDashboard() {
    return this.getAdminDashboardUseCase.execute();
  }
}