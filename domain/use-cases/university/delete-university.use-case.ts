import { UniversityRepository } from '../../repositories/university.repository';

export class DeleteUniversityUseCase {
  constructor(private universityRepository: UniversityRepository) {}

  async execute(id: number): Promise<void> {
    return this.universityRepository.delete(id);
  }
}