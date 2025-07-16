import { Injectable, Inject } from '@nestjs/common';
import { StudentSectionRepository } from '../../repositories/student-section.repository';
import { StudentSection } from '../../entities/student-section.entity';

@Injectable()
export class GetStudentSectionByIdUseCase {
  constructor(@Inject('StudentSectionRepository') private readonly studentSectionRepository: StudentSectionRepository) {}

  async execute(id: number): Promise<StudentSection> {
    return this.studentSectionRepository.findById(id);
  }
}