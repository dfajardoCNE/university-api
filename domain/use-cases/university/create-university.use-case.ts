import { University } from '../../entities/university.entity';
import { UniversityRepository } from '../../repositories/university.repository';

export class CreateUniversityUseCase {
  constructor(private universityRepository: UniversityRepository) {}

  async execute(universityData: Partial<University>): Promise<University> {
    return this.universityRepository.create(universityData);
  }
}