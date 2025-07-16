import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { CreatePaymentUseCase } from '../../../domain/use-cases/payment/create-payment.use-case';
import { PaymentRepositoryImpl } from '../../../infrastructure/database/repositories/payment/payment.repository.impl';
import { InvoiceRepositoryImpl } from '../../../infrastructure/database/repositories/invoice/invoice.repository.impl';
import { NotificationService } from '../../../infrastructure/services/notification.service';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';
import { ServicesModule } from '../../../infrastructure/services/services.module';

@Module({
  imports: [PrismaModule, ServicesModule],
  controllers: [PaymentController],
  providers: [
    {
      provide: 'PaymentRepository',
      useClass: PaymentRepositoryImpl,
    },
    {
      provide: 'InvoiceRepository',
      useClass: InvoiceRepositoryImpl,
    },
    CreatePaymentUseCase,
  ],
})
export class PaymentModule {}