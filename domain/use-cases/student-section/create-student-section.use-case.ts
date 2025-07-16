import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { StudentSectionRepository } from '../../repositories/student-section.repository';
import { SectionRepository } from '../../repositories/section.repository';
import { StudentSection } from '../../entities/student-section.entity';
import { CreateStudentSectionDto } from '../../../application/dto/student-section/create-student-section.dto';
import { ValidatePrerequisitesUseCase } from './validate-prerequisites.use-case';

@Injectable()
export class CreateStudentSectionUseCase {
  constructor(
    @Inject('StudentSectionRepository') 
    private readonly studentSectionRepository: StudentSectionRepository,
    @Inject('SectionRepository') 
    private readonly sectionRepository: SectionRepository,
    private readonly validatePrerequisitesUseCase: ValidatePrerequisitesUseCase
  ) {}

  async execute(createStudentSectionDto: CreateStudentSectionDto): Promise<StudentSection> {
    const { studentId, sectionId } = createStudentSectionDto;
    
    // Verificar si la sección existe y tiene cupo disponible
    const section = await this.sectionRepository.findById(sectionId);
    if (!section) {
      throw new BadRequestException('La sección no existe');
    }
    
    // Verificar cupo disponible
    const enrolledCount = await this.studentSectionRepository.countBySection(sectionId);
    if (enrolledCount >= section.capacity) {
      throw new BadRequestException('La sección no tiene cupos disponibles');
    }
    
    // Verificar que el estudiante no esté ya inscrito en esta sección
    const existingEnrollment = await this.studentSectionRepository.findByStudentAndSection(studentId, sectionId);
    if (existingEnrollment) {
      throw new BadRequestException('El estudiante ya está inscrito en esta sección');
    }
    
    // Validar prerrequisitos
    const prerequisiteValidation = await this.validatePrerequisitesUseCase.execute(studentId, sectionId);
    
    if (!prerequisiteValidation.isValid) {
      const missingCourses = prerequisiteValidation.missingPrerequisites
        .map(course => `${course.code} - ${course.name}`)
        .join(', ');
        
      throw new BadRequestException(`El estudiante no cumple con los prerrequisitos necesarios: ${missingCourses}`);
    }
    
    // Crear la inscripción
    const studentSection: Partial<StudentSection> = {
      studentId,
      sectionId,
      status: 'active',
      createdAt: new Date(),
    };

    return this.studentSectionRepository.create(studentSection);
  }
}