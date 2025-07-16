import { Injectable, Inject } from '@nestjs/common';
import { InvoiceRepository } from '../../repositories/invoice.repository';
import { StudentRepository } from '../../repositories/student.repository';

@Injectable()
export class VerifyPaymentStatusUseCase {
  constructor(
    @Inject('InvoiceRepository') 
    private readonly invoiceRepository: InvoiceRepository,
    @Inject('StudentRepository') 
    private readonly studentRepository: StudentRepository,
  ) {}

  async execute(studentId: number): Promise<{
    hasPendingPayments: boolean;
    canEnroll: boolean;
    pendingAmount: number;
    pendingInvoices: any[];
  }> {
    // Obtener facturas pendientes del estudiante
    const pendingInvoices = await this.invoiceRepository.findPendingByStudent(studentId);
    
    // Calcular monto total pendiente
    const pendingAmount = pendingInvoices.reduce((total, invoice) => total + invoice.amount, 0);
    
    // Determinar si el estudiante puede inscribirse (según políticas de la institución)
    // Por ejemplo, si tiene deudas vencidas no puede inscribirse
    const overdueInvoices = pendingInvoices.filter(
      invoice => invoice.dueDate < new Date() && invoice.status === 'overdue'
    );
    
    const canEnroll = overdueInvoices.length === 0;
    
    return {
      hasPendingPayments: pendingInvoices.length > 0,
      canEnroll,
      pendingAmount,
      pendingInvoices: pendingInvoices.map(invoice => ({
        id: invoice.id,
        concept: invoice.concept,
        amount: invoice.amount,
        dueDate: invoice.dueDate,
        status: invoice.status
      }))
    };
  }
}