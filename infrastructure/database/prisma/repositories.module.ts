import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { PrismaStudentRepository } from './repositories/student.repository.impl';
import { PrismaStudentSectionRepository } from './repositories/student-section.repository.impl';
import { PrismaCoursePrerequisiteRepository } from './repositories/course-prerequisite.repository.impl';
import { PrismaPaymentRepository } from './repositories/payment.repository.impl';
import { PrismaInvoiceRepository } from './repositories/invoice.repository.impl';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'StudentRepository',
      useClass: PrismaStudentRepository,
    },
    {
      provide: 'StudentSectionRepository',
      useClass: PrismaStudentSectionRepository,
    },
    {
      provide: 'CoursePrerequisiteRepository',
      useClass: PrismaCoursePrerequisiteRepository,
    },
    {
      provide: 'PaymentRepository',
      useClass: PrismaPaymentRepository,
    },
    {
      provide: 'InvoiceRepository',
      useClass: PrismaInvoiceRepository,
    },
  ],
  exports: [
    'StudentRepository',
    'StudentSectionRepository',
    'CoursePrerequisiteRepository',
    'PaymentRepository',
    'InvoiceRepository',
  ],
})
export class RepositoriesModule {}