import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepositoryImpl } from './user/user.repository.impl';
import { StudentRepositoryImpl } from './student/student.repository.impl';
import { StudentAcademicRepositoryImpl } from './student/student-academic.repository.impl';
import { StudentSectionRepositoryImpl } from './student-section/student-section.repository.impl';
import { CourseRepositoryImpl } from './course/course.repository.impl';
import { InvoiceRepositoryImpl } from './invoice/invoice.repository.impl';
import { ProfessorRepositoryImpl } from './professor/professor.repository.impl';
import { SectionRepositoryImpl } from './section/section.repository.impl';
import { ExamRepositoryImpl } from './exam/exam.repository.impl';
import { PaymentRepositoryImpl } from './payment/payment.repository.impl';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
    {
      provide: 'StudentRepository',
      useClass: StudentRepositoryImpl,
    },
    {
      provide: 'StudentAcademicRepository',
      useClass: StudentAcademicRepositoryImpl,
    },
    {
      provide: 'StudentSectionRepository',
      useClass: StudentSectionRepositoryImpl,
    },
    {
      provide: 'CourseRepository',
      useClass: CourseRepositoryImpl,
    },
    {
      provide: 'InvoiceRepository',
      useClass: InvoiceRepositoryImpl,
    },
    {
      provide: 'ProfessorRepository',
      useClass: ProfessorRepositoryImpl,
    },
    {
      provide: 'SectionRepository',
      useClass: SectionRepositoryImpl,
    },
    {
      provide: 'ExamRepository',
      useClass: ExamRepositoryImpl,
    },
    {
      provide: 'PaymentRepository',
      useClass: PaymentRepositoryImpl,
    },
  ],
  exports: [
    'UserRepository',
    'StudentRepository',
    'StudentAcademicRepository',
    'StudentSectionRepository',
    'CourseRepository',
    'InvoiceRepository',
    'ProfessorRepository',
    'SectionRepository',
    'ExamRepository',
    'PaymentRepository',
  ],
})
export class RepositoriesModule {}