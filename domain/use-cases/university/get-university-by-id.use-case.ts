import { University } from '../../entities/university.entity';
import { UniversityRepository } from '../../repositories/university.repository';

export class GetUniversityByIdUseCase {
  constructor(private universityRepository: UniversityRepository) {}

  async execute(id: number): Promise<University> {
    return this.universityRepository.findById(id);
  }
}