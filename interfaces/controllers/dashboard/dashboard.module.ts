
import { Module } from '@nestjs/common';
import { StudentModule } from '../student/student.module';
import { VerifyPaymentStatusUseCase } from 'domain/use-cases/invoice/verify-payment-status.use-case';
import { CalculateStudentGpaUseCase } from 'domain/use-cases/student/calculate-student-gpa.use-case';
import { SubmissionRepositoryImpl } from 'infrastructure/database/repositories/submission/submission.repository.impl';
import { AssignmentRepositoryImpl } from 'infrastructure/database/repositories/assignment/assignment.repository.impl';
import { StudentSectionRepositoryImpl } from 'infrastructure/database/repositories/student-section/student-section.repository.impl';
import { GetStudentDashboardUseCase } from 'domain/use-cases/dashboard/get-student-dashboard.use-case';
import { DashboardController } from './dashboard.controller';
import { RepositoriesModule } from '../../../infrastructure/database/repositories/repositories.module';
import { StudentRepositoryImpl } from '../../../infrastructure/database/repositories/student/student.repository.impl';
import { AssignmentRepository } from 'domain/repositories/assignment.repository';
import { SubmissionRepository } from 'domain/repositories/submission.repository';
import { GetProfessorDashboardUseCase } from '../../../domain/use-cases/dashboard/get-professor-dashboard.use-case';
import { GetAdminDashboardUseCase } from '../../../domain/use-cases/dashboard/get-admin-dashboard.use-case';

@Module({
  imports: [StudentModule, RepositoriesModule],
  controllers: [DashboardController],
  providers: [
    {
      provide: 'StudentRepository',
      useClass: StudentRepositoryImpl,
    },
    {
      provide: 'AssignmentRepository',
      useClass: AssignmentRepositoryImpl,
    },
    {
      provide: 'SubmissionRepository',
      useClass: SubmissionRepositoryImpl,
    },
    GetStudentDashboardUseCase,
    GetProfessorDashboardUseCase,
    GetAdminDashboardUseCase,
    StudentSectionRepositoryImpl,
    AssignmentRepositoryImpl,
    SubmissionRepositoryImpl,
    CalculateStudentGpaUseCase,
    VerifyPaymentStatusUseCase,
  ],
})
export class DashboardModule {}