import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { CreateInvoiceUseCase } from '../../../domain/use-cases/invoice/create-invoice.use-case';
import { VerifyPaymentStatusUseCase } from '../../../domain/use-cases/invoice/verify-payment-status.use-case';
import { InvoiceRepositoryImpl } from '../../../infrastructure/database/repositories/invoice/invoice.repository.impl';
import { StudentRepositoryImpl } from '../../../infrastructure/database/repositories/student/student.repository.impl';
import { NotificationService } from '../../../infrastructure/services/notification.service';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';
import { ServicesModule } from '../../../infrastructure/services/services.module';

@Module({
  imports: [PrismaModule, ServicesModule],
  controllers: [InvoiceController],
  providers: [
    {
      provide: 'InvoiceRepository',
      useClass: InvoiceRepositoryImpl,
    },
    {
      provide: 'StudentRepository',
      useClass: StudentRepositoryImpl,
    },
    CreateInvoiceUseCase,
    VerifyPaymentStatusUseCase,
  ],
})
export class InvoiceModule {}