
import { Module } from '@nestjs/common';
import { AcademicStatusController } from './academic-status.controller';
import { CalculateStudentGpaUseCase } from '../../../domain/use-cases/student/calculate-student-gpa.use-case';
import { UpdateAcademicStatusUseCase } from '../../../domain/use-cases/student/update-academic-status.use-case';
import { RepositoriesModule } from '../../../infrastructure/database/prisma/repositories.module';
import { StudentSectionRepositoryImpl } from '../../../infrastructure/database/repositories/student-section/student-section.repository.impl';
import { CourseRepositoryImpl } from '../../../infrastructure/database/repositories/course/course.repository.impl';

@Module({
  imports: [RepositoriesModule],
  controllers: [AcademicStatusController],
  providers: [
    {
      provide: 'StudentSectionRepository',
      useClass: StudentSectionRepositoryImpl,
    },
    {
      provide: 'CourseRepository',
      useClass: CourseRepositoryImpl,
    },
    CalculateStudentGpaUseCase,
    UpdateAcademicStatusUseCase,
  ],
})
export class AcademicModule {}