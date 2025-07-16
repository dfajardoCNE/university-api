import { Injectable, Inject } from '@nestjs/common';
import { Payment } from '../../entities/payment.entity';
import { PaymentRepository } from '../../repositories/payment.repository';
import { InvoiceRepository } from '../../repositories/invoice.repository';
import { NotificationService } from '../../../infrastructure/services/notification.service';

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    @Inject('PaymentRepository') 
    private readonly paymentRepository: PaymentRepository,
    @Inject('InvoiceRepository') 
    private readonly invoiceRepository: InvoiceRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async execute(paymentData: Partial<Payment>): Promise<Payment> {
    // Crear el registro de pago
    const payment = await this.paymentRepository.create({
      ...paymentData,
      status: 'completed',
      paymentDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Si el pago está asociado a una factura, actualizar su estado
    if (paymentData.referenceNumber) {
      const invoiceId = parseInt(paymentData.referenceNumber);
      if (!isNaN(invoiceId)) {
        const invoice = await this.invoiceRepository.findById(invoiceId);
        
        if (invoice && invoice.studentId === paymentData.studentId) {
          // Verificar si el pago cubre el monto total de la factura
          if (paymentData.amount >= invoice.amount) {
            await this.invoiceRepository.updateStatus(invoiceId, 'paid');
          } else {
            // Si es un pago parcial, actualizar el estado según corresponda
            await this.invoiceRepository.updateStatus(invoiceId, 'partially_paid');
          }
        }
      }
    }

    // Enviar notificación al estudiante
    await this.notificationService.sendNotification(
      paymentData.studentId,
      'Pago registrado',
      `Tu pago por ${paymentData.amount} ha sido registrado correctamente.`
    );

    // Enviar email de confirmación
    // (Aquí se implementaría la lógica para enviar el email)

    return payment;
  }
}