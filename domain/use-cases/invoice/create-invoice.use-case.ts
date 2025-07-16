import { Injectable, Inject } from '@nestjs/common';
import { Invoice } from '../../entities/invoice.entity';
import { InvoiceRepository } from '../../repositories/invoice.repository';
import { StudentRepository } from '../../repositories/student.repository';
import { NotificationService } from '../../../infrastructure/services/notification.service';

@Injectable()
export class CreateInvoiceUseCase {
  constructor(
    @Inject('InvoiceRepository') 
    private readonly invoiceRepository: InvoiceRepository,
    @Inject('StudentRepository') 
    private readonly studentRepository: StudentRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async execute(invoiceData: Partial<Invoice>): Promise<Invoice> {
    // Verificar que el estudiante existe
    const student = await this.studentRepository.findById(invoiceData.studentId);
    if (!student) {
      throw new Error('El estudiante no existe');
    }

    // Crear la factura
    const invoice = await this.invoiceRepository.create({
      ...invoiceData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Enviar notificación al estudiante
    await this.notificationService.sendNotification(
      invoiceData.studentId,
      'Nueva factura generada',
      `Se ha generado una nueva factura por ${invoiceData.amount} con vencimiento el ${invoiceData.dueDate.toLocaleDateString()}.`
    );

    // Enviar email con la factura
    // (Aquí se implementaría la lógica para enviar el email)

    return invoice;
  }
}