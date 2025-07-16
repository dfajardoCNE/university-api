import { Injectable, Inject } from '@nestjs/common';
import { StudentSectionRepository } from '../../repositories/student-section.repository';
import { StudentSection } from '../../entities/student-section.entity';
import { UpdateStudentSectionDto } from '../../../application/dto/student-section/update-student-section.dto';

@Injectable()
export class UpdateStudentSectionUseCase {
  constructor(@Inject('StudentSectionRepository') private readonly studentSectionRepository: StudentSectionRepository) {}

  async execute(id: number, updateStudentSectionDto: UpdateStudentSectionDto): Promise<StudentSection> {
    // Convertir el DTO a un objeto parcial de StudentSection
    const studentSectionData: Partial<StudentSection> = {};
    
    // Mapear los campos del DTO a la entidad
    if (updateStudentSectionDto.grade !== undefined) {
      studentSectionData.currentGrade = updateStudentSectionDto.grade;
    }
    
    // Actualizar la fecha de modificación
    studentSectionData.updatedAt = new Date();
    
    return this.studentSectionRepository.update(id, studentSectionData);
  }
}