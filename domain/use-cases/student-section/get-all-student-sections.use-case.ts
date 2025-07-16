import { Injectable, Inject } from '@nestjs/common';
import { StudentSectionRepository } from '../../repositories/student-section.repository';
import { StudentSection } from '../../entities/student-section.entity';

@Injectable()
export class GetAllStudentSectionsUseCase {
  constructor(@Inject('StudentSectionRepository') private readonly studentSectionRepository: StudentSectionRepository) {}

  async execute(): Promise<StudentSection[]> {
    return this.studentSectionRepository.findAll();
  }
}