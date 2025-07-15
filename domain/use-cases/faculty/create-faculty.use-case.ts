import { Faculty } from '../../entities/faculty.entity';
import { FacultyRepository } from '../../repositories/faculty.repository';

export class CreateFacultyUseCase {
  constructor(private facultyRepository: FacultyRepository) {}

  async execute(faculty: Partial<Faculty>): Promise<Faculty> {
    return this.facultyRepository.create(faculty);
  }
}