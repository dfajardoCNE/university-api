import { University } from '../../entities/university.entity';
import { UniversityRepository } from '../../repositories/university.repository';

export class UpdateUniversityUseCase {
  constructor(private universityRepository: UniversityRepository) {}

  async execute(id: number, universityData: Partial<University>): Promise<University> {
    return this.universityRepository.update(id, universityData);
  }
}