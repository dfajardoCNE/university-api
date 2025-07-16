import { Injectable, Inject } from '@nestjs/common';
import { CoursePrerequisiteRepository } from '../../repositories/course-prerequisite.repository';
import { StudentSectionRepository } from '../../repositories/student-section.repository';
import { SectionRepository } from '../../repositories/section.repository';

@Injectable()
export class ValidatePrerequisitesUseCase {
  constructor(
    @Inject('CoursePrerequisiteRepository') 
    private readonly coursePrerequisiteRepository: CoursePrerequisiteRepository,
    @Inject('StudentSectionRepository') 
    private readonly studentSectionRepository: StudentSectionRepository,
    @Inject('SectionRepository') 
    private readonly sectionRepository: SectionRepository,
  ) {}

  async execute(studentId: number, sectionId: number): Promise<{ 
    isValid: boolean; 
    missingPrerequisites: { id: number; code: string; name: string }[] 
  }> {
    // Obtener el curso de la sección
    const section = await this.sectionRepository.findById(sectionId);
    if (!section) {
      throw new Error('La sección no existe');
    }

    const courseId = section.courseId;

    // Obtener todos los prerrequisitos del curso
    const prerequisites = await this.coursePrerequisiteRepository.findPrerequisitesForCourse(courseId);
    
    if (!prerequisites || prerequisites.length === 0) {
      // No hay prerrequisitos, la validación es exitosa
      return { isValid: true, missingPrerequisites: [] };
    }

    // Obtener todas las secciones aprobadas por el estudiante
    const passedSections = await this.studentSectionRepository.findPassedSectionsByStudent(studentId);
    
    // Extraer los IDs de los cursos aprobados
    const passedCourseIds = passedSections.map(section => section.courseId);
    
    // Verificar cada prerrequisito
    const missingPrerequisites = [];
    
    for (const prerequisite of prerequisites) {
      const prerequisiteId = prerequisite.prerequisiteId;
      
      // Verificar si el estudiante ha aprobado este prerrequisito
      if (!passedCourseIds.includes(prerequisiteId)) {
        // Obtener información del curso prerrequisito para mostrar al usuario
        const prerequisiteCourse = await this.coursePrerequisiteRepository.findCourseById(prerequisiteId);
        
        missingPrerequisites.push({
          id: prerequisiteId,
          code: prerequisiteCourse.code,
          name: prerequisiteCourse.name
        });
      }
    }
    
    return {
      isValid: missingPrerequisites.length === 0,
      missingPrerequisites
    };
  }
}