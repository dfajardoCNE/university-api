import { Injectable, Inject } from '@nestjs/common';
import { StudentSectionRepository } from '../../repositories/student-section.repository';
import { CourseRepository } from '../../repositories/course.repository';

export interface GpaResult {
  gpa: number;
  totalCredits: number;
  passedCredits: number;
  failedCredits: number;
  completedCourses: number;
}

@Injectable()
export class CalculateStudentGpaUseCase {
  constructor(
    @Inject('StudentSectionRepository') 
    private readonly studentSectionRepository: StudentSectionRepository,
    @Inject('CourseRepository') 
    private readonly courseRepository: CourseRepository,
  ) {}

  async execute(studentId: number, termId?: number): Promise<GpaResult> {
    // Obtener todas las secciones completadas por el estudiante (con calificación final)
    const completedSections = await this.studentSectionRepository.findCompletedSectionsByStudent(
      studentId, 
      termId
    );
    
    if (!completedSections || completedSections.length === 0) {
      return {
        gpa: 0,
        totalCredits: 0,
        passedCredits: 0,
        failedCredits: 0,
        completedCourses: 0
      };
    }

    let totalPoints = 0;
    let totalCredits = 0;
    let passedCredits = 0;
    let failedCredits = 0;
    
    // Calcular el promedio ponderado
    for (const section of completedSections) {
      // Obtener información del curso (créditos)
      const course = await this.courseRepository.findById(section.courseId);
      const credits = course.credits || 1; // Si no tiene créditos definidos, asumimos 1
      
      // Sumar puntos (calificación * créditos)
      totalPoints += (section.finalGrade || 0) * credits;
      totalCredits += credits;
      
      // Contabilizar créditos aprobados/reprobados
      if ((section.finalGrade || 0) >= 3.0) { // Asumiendo que 3.0 es la nota mínima de aprobación
        passedCredits += credits;
      } else {
        failedCredits += credits;
      }
    }
    
    // Calcular GPA
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    
    return {
      gpa: parseFloat(gpa.toFixed(2)),
      totalCredits,
      passedCredits,
      failedCredits,
      completedCourses: completedSections.length
    };
  }
}