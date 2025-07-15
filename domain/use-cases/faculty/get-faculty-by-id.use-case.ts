import { Faculty } from '../../entities/faculty.entity';
import { FacultyRepository } from '../../repositories/faculty.repository';

export class GetFacultyByIdUseCase {
  constructor(private facultyRepository: FacultyRepository) {}

  async execute(id: number): Promise<Faculty> {
    return this.facultyRepository.findById(id);
  }
}