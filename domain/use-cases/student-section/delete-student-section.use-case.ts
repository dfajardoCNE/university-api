import { Injectable, Inject } from '@nestjs/common';
import { StudentSectionRepository } from '../../repositories/student-section.repository';

@Injectable()
export class DeleteStudentSectionUseCase {
  constructor(@Inject('StudentSectionRepository') private readonly studentSectionRepository: StudentSectionRepository) {}

  async execute(id: number): Promise<void> {
    return this.studentSectionRepository.delete(id);
  }
}