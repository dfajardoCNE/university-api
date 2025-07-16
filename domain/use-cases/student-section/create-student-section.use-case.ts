import { Injectable, Inject } from '@nestjs/common';
import { StudentSectionRepository } from '../../repositories/student-section.repository';
import { StudentSection } from '../../entities/student-section.entity';
import { CreateStudentSectionDto } from '../../../application/dto/student-section/create-student-section.dto';

@Injectable()
export class CreateStudentSectionUseCase {
  constructor(@Inject('StudentSectionRepository') private readonly studentSectionRepository: StudentSectionRepository) {}

  async execute(createStudentSectionDto: CreateStudentSectionDto): Promise<StudentSection> {
    const studentSection: Partial<StudentSection> = {
      studentId: createStudentSectionDto.studentId,
      sectionId: createStudentSectionDto.sectionId,
      createdAt: new Date(),
    };

    return this.studentSectionRepository.create(studentSection);
  }
}