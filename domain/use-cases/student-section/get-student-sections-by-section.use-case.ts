import { Injectable, Inject } from '@nestjs/common';
import { StudentSectionRepository } from '../../repositories/student-section.repository';
import { StudentSection } from '../../entities/student-section.entity';

@Injectable()
export class GetStudentSectionsBySectionUseCase {
  constructor(@Inject('StudentSectionRepository') private readonly studentSectionRepository: StudentSectionRepository) {}

  async execute(sectionId: number): Promise<StudentSection[]> {
    return this.studentSectionRepository.findBySection(sectionId);
  }
}