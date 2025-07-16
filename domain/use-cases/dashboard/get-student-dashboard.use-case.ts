import { Injectable, Inject } from '@nestjs/common';
import { StudentRepository } from '../../repositories/student.repository';
import { StudentSectionRepository } from '../../repositories/student-section.repository';
import { AssignmentRepository } from '../../repositories/assignment.repository';
import { SubmissionRepository } from '../../repositories/submission.repository';
import { CalculateStudentGpaUseCase } from '../student/calculate-student-gpa.use-case';
import { VerifyPaymentStatusUseCase } from '../invoice/verify-payment-status.use-case';

@Injectable()
export class GetStudentDashboardUseCase {
  constructor(
    @Inject('StudentRepository') 
    private readonly studentRepository: StudentRepository,
    @Inject('StudentSectionRepository') 
    private readonly studentSectionRepository: StudentSectionRepository,
    @Inject('AssignmentRepository') 
    private readonly assignmentRepository: AssignmentRepository,
    @Inject('SubmissionRepository') 
    private readonly submissionRepository: SubmissionRepository,
    private readonly calculateStudentGpaUseCase: CalculateStudentGpaUseCase,
    private readonly verifyPaymentStatusUseCase: VerifyPaymentStatusUseCase,
  ) {}

  async execute(studentId: number): Promise<any> {
    // Obtener información básica del estudiante
    const student = await this.studentRepository.findById(studentId);
    
    // Obtener GPA y estado académico
    const academicInfo = await this.calculateStudentGpaUseCase.execute(studentId);
    
    // Obtener cursos actuales
    // Este método debería implementarse en el repositorio correspondiente
    // Por ahora, usamos valores de ejemplo para el MVP
    const currentSections = []; // await this.studentSectionRepository.findCurrentSectionsByStudent(studentId);
    
    // Obtener próximas tareas y exámenes
    const upcomingAssignments = [];
    // Como currentSections está vacío para el MVP, no se ejecutará este bucle
    // Pero dejamos la estructura para cuando se implemente completamente
    for (const section of currentSections) {
      // Este método debería implementarse en el repositorio correspondiente
      const assignments = []; // await this.assignmentRepository.findUpcomingBySection(section.sectionId);
      upcomingAssignments.push(...assignments.map(assignment => ({
        ...assignment,
        courseName: "Nombre del curso", // section.courseName,
        courseCode: "CURSO101", // section.courseCode,
      })));
    }
    
    // Ordenar por fecha de entrega
    upcomingAssignments.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
    
    // Obtener tareas pendientes de calificación
    const pendingGrades = [];
    // Como currentSections está vacío para el MVP, no se ejecutará este bucle
    // Pero dejamos la estructura para cuando se implemente completamente
    for (const section of currentSections) {
      // Este método debería implementarse en el repositorio correspondiente
      const submissions = []; // await this.submissionRepository.findPendingGradesByStudentAndSection(studentId, section.sectionId);
      pendingGrades.push(...submissions.map(submission => ({
        ...submission,
        courseName: "Nombre del curso", // section.courseName,
        courseCode: "CURSO101", // section.courseCode,
      })));
    }
    
    // Verificar estado de pagos
    const paymentStatus = await this.verifyPaymentStatusUseCase.execute(studentId);
    
    // Construir el dashboard
    return {
      student: {
        id: student.id,
        name: student.firstName && student.lastName ? 
              `${student.firstName} ${student.lastName}` : 
              `Estudiante ID: ${student.id}`,
        email: student.email || 'No disponible',
        academicStatus: student.academicStatus || 'good_standing',
      },
      academicSummary: {
        gpa: academicInfo.gpa,
        totalCredits: academicInfo.totalCredits,
        passedCredits: academicInfo.passedCredits,
        failedCredits: academicInfo.failedCredits,
      },
      currentCourses: currentSections.map(section => ({
        id: section.id,
        courseCode: section.courseCode,
        courseName: section.courseName,
        schedule: section.schedule,
        professor: section.professorName,
        currentGrade: section.currentGrade,
      })),
      upcomingAssignments: upcomingAssignments.slice(0, 5), // Mostrar solo los 5 más próximos
      pendingGrades,
      paymentStatus: {
        hasPendingPayments: paymentStatus.hasPendingPayments,
        canEnroll: paymentStatus.canEnroll,
        pendingAmount: paymentStatus.pendingAmount,
      },
      // Añadir más secciones según sea necesario
    };
  }
}