import { FacultyRepository } from '../../repositories/faculty.repository';

export class DeleteFacultyUseCase {
  constructor(private facultyRepository: FacultyRepository) {}

  async execute(id: number): Promise<void> {
    return this.facultyRepository.delete(id);
  }
}