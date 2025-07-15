import { Faculty } from '../../entities/faculty.entity';
import { FacultyRepository } from '../../repositories/faculty.repository';

export class GetFacultiesByUniversityUseCase {
  constructor(private facultyRepository: FacultyRepository) {}

  async execute(universityId: number): Promise<Faculty[]> {
    return this.facultyRepository.findByUniversity(universityId);
  }
}