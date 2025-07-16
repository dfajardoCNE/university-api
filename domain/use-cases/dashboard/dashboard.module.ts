import { Module } from '@nestjs/common';
import { GetStudentDashboardUseCase } from './get-student-dashboard.use-case';
import { GetProfessorDashboardUseCase } from './get-professor-dashboard.use-case';
import { GetAdminDashboardUseCase } from './get-admin-dashboard.use-case';
import { CalculateStudentGpaUseCase } from '../student/calculate-student-gpa.use-case';
import { VerifyPaymentStatusUseCase } from '../invoice/verify-payment-status.use-case';

@Module({
  providers: [
    GetStudentDashboardUseCase,
    GetProfessorDashboardUseCase,
    GetAdminDashboardUseCase,
    CalculateStudentGpaUseCase,
    VerifyPaymentStatusUseCase,
  ],
  exports: [
    GetStudentDashboardUseCase,
    GetProfessorDashboardUseCase,
    GetAdminDashboardUseCase,
  ],
})
export class DashboardModule {}