import { Module } from '@nestjs/common';
import { StudentSectionController } from './student-section.controller';
import { GetAllStudentSectionsUseCase } from '../../../domain/use-cases/student-section/get-all-student-sections.use-case';
import { GetStudentSectionByIdUseCase } from '../../../domain/use-cases/student-section/get-student-section-by-id.use-case';
import { GetStudentSectionsByStudentUseCase } from '../../../domain/use-cases/student-section/get-student-sections-by-student.use-case';
import { GetStudentSectionsBySectionUseCase } from '../../../domain/use-cases/student-section/get-student-sections-by-section.use-case';
import { CreateStudentSectionUseCase } from '../../../domain/use-cases/student-section/create-student-section.use-case';
import { UpdateStudentSectionUseCase } from '../../../domain/use-cases/student-section/update-student-section.use-case';
import { DeleteStudentSectionUseCase } from '../../../domain/use-cases/student-section/delete-student-section.use-case';
import { StudentSectionRepositoryImpl } from '../../../infrastructure/database/repositories/student-section/student-section.repository.impl';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';

const STUDENT_SECTION_REPOSITORY = 'StudentSectionRepository';

@Module({
  imports: [PrismaModule],
  controllers: [StudentSectionController],
  providers: [
    {
      provide: STUDENT_SECTION_REPOSITORY,
      useClass: StudentSectionRepositoryImpl,
    },
    GetAllStudentSectionsUseCase,
    GetStudentSectionByIdUseCase,
    GetStudentSectionsByStudentUseCase,
    GetStudentSectionsBySectionUseCase,
    CreateStudentSectionUseCase,
    UpdateStudentSectionUseCase,
    DeleteStudentSectionUseCase,
  ],
  exports: [STUDENT_SECTION_REPOSITORY],
})
export class StudentSectionModule {}