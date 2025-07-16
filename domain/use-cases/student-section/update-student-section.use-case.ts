import { Injectable, Inject } from '@nestjs/common';
import { StudentSectionRepository } from '../../repositories/student-section.repository';
import { StudentSection } from '../../entities/student-section.entity';
import { UpdateStudentSectionDto } from '../../../application/dto/student-section/update-student-section.dto';

@Injectable()
export class UpdateStudentSectionUseCase {
  constructor(@Inject('StudentSectionRepository') private readonly studentSectionRepository: StudentSectionRepository) {}

  async execute(id: number, updateStudentSectionDto: UpdateStudentSectionDto): Promise<StudentSection> {
    return this.studentSectionRepository.update(id, updateStudentSectionDto);
  }
}