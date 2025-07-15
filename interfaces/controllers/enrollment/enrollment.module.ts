import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentRepositoryImpl } from '../../../infrastructure/database/repositories/enrollment/enrollment.repository.impl';
import { GetAllEnrollmentsUseCase } from '../../../domain/use-cases/enrollment/get-all-enrollments.use-case';
import { GetEnrollmentByIdUseCase } from '../../../domain/use-cases/enrollment/get-enrollment-by-id.use-case';
import { GetEnrollmentsByStudentUseCase } from '../../../domain/use-cases/enrollment/get-enrollments-by-student.use-case';
import { GetEnrollmentsBySectionUseCase } from '../../../domain/use-cases/enrollment/get-enrollments-by-section.use-case';
import { CreateEnrollmentUseCase } from '../../../domain/use-cases/enrollment/create-enrollment.use-case';
import { UpdateEnrollmentUseCase } from '../../../domain/use-cases/enrollment/update-enrollment.use-case';
import { UpdateGradeUseCase } from '../../../domain/use-cases/enrollment/update-grade.use-case';
import { DeleteEnrollmentUseCase } from '../../../domain/use-cases/enrollment/delete-enrollment.use-case';

@Module({
  controllers: [EnrollmentController],
  providers: [
    {
      provide: 'EnrollmentRepository',
      useClass: EnrollmentRepositoryImpl,
    },
    {
      provide: GetAllEnrollmentsUseCase,
      useFactory: (enrollmentRepository) => new GetAllEnrollmentsUseCase(enrollmentRepository),
      inject: ['EnrollmentRepository'],
    },
    {
      provide: GetEnrollmentByIdUseCase,
      useFactory: (enrollmentRepository) => new GetEnrollmentByIdUseCase(enrollmentRepository),
      inject: ['EnrollmentRepository'],
    },
    {
      provide: GetEnrollmentsByStudentUseCase,
      useFactory: (enrollmentRepository) => new GetEnrollmentsByStudentUseCase(enrollmentRepository),
      inject: ['EnrollmentRepository'],
    },
    {
      provide: GetEnrollmentsBySectionUseCase,
      useFactory: (enrollmentRepository) => new GetEnrollmentsBySectionUseCase(enrollmentRepository),
      inject: ['EnrollmentRepository'],
    },
    {
      provide: CreateEnrollmentUseCase,
      useFactory: (enrollmentRepository) => new CreateEnrollmentUseCase(enrollmentRepository),
      inject: ['EnrollmentRepository'],
    },
    {
      provide: UpdateEnrollmentUseCase,
      useFactory: (enrollmentRepository) => new UpdateEnrollmentUseCase(enrollmentRepository),
      inject: ['EnrollmentRepository'],
    },
    {
      provide: UpdateGradeUseCase,
      useFactory: (enrollmentRepository) => new UpdateGradeUseCase(enrollmentRepository),
      inject: ['EnrollmentRepository'],
    },
    {
      provide: DeleteEnrollmentUseCase,
      useFactory: (enrollmentRepository) => new DeleteEnrollmentUseCase(enrollmentRepository),
      inject: ['EnrollmentRepository'],
    },
  ],
})
export class EnrollmentModule {}