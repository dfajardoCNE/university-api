import { Injectable, Inject } from '@nestjs/common';
import { ProfessorRepository } from '../../repositories/professor.repository';
import { SectionRepository } from '../../repositories/section.repository';
import { AssignmentRepository } from '../../repositories/assignment.repository';
import { SubmissionRepository } from '../../repositories/submission.repository';
import { ExamRepository } from '../../repositories/exam.repository';
import { CourseRepository } from '../../repositories/course.repository';

@Injectable()
export class GetProfessorDashboardUseCase {
  constructor(
    @Inject('ProfessorRepository') 
    private readonly professorRepository: ProfessorRepository,
    @Inject('SectionRepository') 
    private readonly sectionRepository: SectionRepository,
    @Inject('AssignmentRepository') 
    private readonly assignmentRepository: AssignmentRepository,
    @Inject('SubmissionRepository') 
    private readonly submissionRepository: SubmissionRepository,
    @Inject('ExamRepository') 
    private readonly examRepository: ExamRepository,
    @Inject('CourseRepository') 
    private readonly courseRepository: CourseRepository,
  ) {}

  async execute(professorId: number): Promise<any> {
    // Obtener información básica del profesor
    const professor = await this.professorRepository.findById(professorId);
    
    // Obtener secciones actuales
    const currentSections = await this.sectionRepository.findByProfessor(professorId);
    
    // Obtener próximas tareas y exámenes
    const upcomingAssignments = [];
    for (const section of currentSections) {
      // Este método debería implementarse en el repositorio correspondiente
      // Por ahora, usamos valores de ejemplo para el MVP
      const assignments = []; // await this.assignmentRepository.findUpcomingBySection(section.id);
      
      // Obtenemos el curso asociado a la sección para mostrar información relevante
      const course = await this.courseRepository.findById(section.courseId);
      
      upcomingAssignments.push(...assignments.map(assignment => ({
        ...assignment,
        courseName: course.name,
        courseCode: course.code,
      })));
    }
    
    // Ordenar por fecha de entrega
    upcomingAssignments.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
    
    // Obtener entregas pendientes de calificación
    const pendingGrading = [];
    for (const section of currentSections) {
      // Este método debería implementarse en el repositorio correspondiente
      // Por ahora, usamos valores de ejemplo para el MVP
      const submissions = []; // await this.submissionRepository.findPendingGradingBySection(section.id);
      
      // Obtenemos el curso asociado a la sección para mostrar información relevante
      const course = await this.courseRepository.findById(section.courseId);
      
      pendingGrading.push(...submissions.map(submission => ({
        ...submission,
        courseName: course.name,
        courseCode: course.code,
      })));
    }
    
    // Obtener próximos exámenes
    const upcomingExams = [];
    for (const section of currentSections) {
      // Este método debería implementarse en el repositorio correspondiente
      // Por ahora, usamos valores de ejemplo para el MVP
      const exams = []; // await this.examRepository.findUpcomingBySection(section.id);
      
      // Obtenemos el curso asociado a la sección para mostrar información relevante
      const course = await this.courseRepository.findById(section.courseId);
      
      upcomingExams.push(...exams.map(exam => ({
        ...exam,
        courseName: course.name,
        courseCode: course.code,
      })));
    }
    
    // Ordenar por fecha
    upcomingExams.sort((a, b) => a.date.getTime() - b.date.getTime());
    
    // Construir el dashboard
    return {
      professor: {
        id: professor.id,
        name: professor.firstName && professor.lastName ? 
              `${professor.firstName} ${professor.lastName}` : 
              `Profesor ID: ${professor.id}`,
        email: professor.email || 'No disponible',
        department: professor.departmentName || 'No asignado',
      },
      currentCourses: await Promise.all(currentSections.map(async section => {
        const course = await this.courseRepository.findById(section.courseId);
        const enrolledCount = 0; // Esto debería venir de un método en el repositorio
        
        return {
          id: section.id,
          courseCode: course ? course.code : 'N/A',
          courseName: course ? course.name : 'Curso no disponible',
          schedule: 'Horario no disponible', // Esto debería venir de un método que combine sessionTime
          enrolledStudents: enrolledCount,
          room: 'Aula no disponible', // Esto debería venir de un join con classroom
        };
      })),
      upcomingAssignments: upcomingAssignments.slice(0, 5), // Mostrar solo los 5 más próximos
      pendingGrading: pendingGrading.slice(0, 10), // Mostrar solo los 10 más recientes
      upcomingExams: upcomingExams.slice(0, 5), // Mostrar solo los 5 más próximos
      // Añadir más secciones según sea necesario
    };
  }
}