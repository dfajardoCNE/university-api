import { Faculty } from '../../entities/faculty.entity';
import { FacultyRepository } from '../../repositories/faculty.repository';

export class UpdateFacultyUseCase {
  constructor(private facultyRepository: FacultyRepository) {}

  async execute(id: number, faculty: Partial<Faculty>): Promise<Faculty> {
    return this.facultyRepository.update(id, faculty);
  }
}