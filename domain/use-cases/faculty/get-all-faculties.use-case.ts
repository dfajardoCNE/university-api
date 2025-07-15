import { Faculty } from '../../entities/faculty.entity';
import { FacultyRepository } from '../../repositories/faculty.repository';

export class GetAllFacultiesUseCase {
  constructor(private facultyRepository: FacultyRepository) {}

  async execute(): Promise<Faculty[]> {
    return this.facultyRepository.findAll();
  }
}