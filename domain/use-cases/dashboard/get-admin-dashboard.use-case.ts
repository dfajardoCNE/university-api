import { Injectable, Inject } from '@nestjs/common';
import { StudentRepository } from '../../repositories/student.repository';
import { ProfessorRepository } from '../../repositories/professor.repository';
import { CourseRepository } from '../../repositories/course.repository';
import { SectionRepository } from '../../repositories/section.repository';
import { InvoiceRepository } from '../../repositories/invoice.repository';
import { PaymentRepository } from '../../repositories/payment.repository';

@Injectable()
export class GetAdminDashboardUseCase {
  constructor(
    @Inject('StudentRepository') 
    private readonly studentRepository: StudentRepository,
    @Inject('ProfessorRepository') 
    private readonly professorRepository: ProfessorRepository,
    @Inject('CourseRepository') 
    private readonly courseRepository: CourseRepository,
    @Inject('SectionRepository') 
    private readonly sectionRepository: SectionRepository,
    @Inject('InvoiceRepository') 
    private readonly invoiceRepository: InvoiceRepository,
    @Inject('PaymentRepository') 
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(): Promise<any> {
    // Obtener estadísticas generales
    // Estos métodos deberían implementarse en los repositorios correspondientes
    // Por ahora, usamos valores de ejemplo para el MVP
    const studentCount = 150; // await this.studentRepository.count();
    const professorCount = 45; // await this.professorRepository.count();
    const courseCount = 200; // await this.courseRepository.count();
    const activeTerms = [{ id: 1, name: 'Semestre 2025-1' }]; // await this.sectionRepository.getActiveTerms();
    
    // Obtener estadísticas financieras
    const pendingInvoices = await this.invoiceRepository.findByStatus('pending');
    const pendingAmount = pendingInvoices.reduce((total, invoice) => total + invoice.amount, 0);
    
    // Estos métodos deberían implementarse en los repositorios correspondientes
    // Por ahora, usamos valores de ejemplo para el MVP
    const recentPayments = [
      { id: 1, studentName: 'Juan Pérez', amount: 1500, paymentDate: new Date(), concept: 'Matrícula' },
      { id: 2, studentName: 'María López', amount: 1500, paymentDate: new Date(), concept: 'Matrícula' }
    ]; // await this.paymentRepository.findRecent(10);
    const monthlyRevenue = 45000; // await this.paymentRepository.getMonthlyRevenue();
    
    // Obtener estudiantes en riesgo académico
    const studentsOnProbation = await this.studentRepository.findByAcademicStatus('academic_probation');
    
    // Obtener secciones con baja inscripción
    // Este método debería implementarse en el repositorio correspondiente
    // Por ahora, usamos valores de ejemplo para el MVP
    const lowEnrollmentSections = []; // await this.sectionRepository.findLowEnrollment();
    
    // Construir el dashboard
    return {
      generalStats: {
        studentCount,
        professorCount,
        courseCount,
        activeTerms: activeTerms.length,
      },
      financialSummary: {
        pendingInvoicesCount: pendingInvoices.length,
        pendingAmount,
        monthlyRevenue,
      },
      academicAlerts: {
        studentsOnProbationCount: studentsOnProbation.length,
        lowEnrollmentSectionsCount: lowEnrollmentSections.length,
      },
      recentActivity: {
        recentPayments: recentPayments.map(payment => ({
          id: payment.id,
          studentName: payment.studentName,
          amount: payment.amount,
          date: payment.paymentDate,
          concept: payment.concept,
        })),
      },
      // Añadir más secciones según sea necesario
    };
  }
}