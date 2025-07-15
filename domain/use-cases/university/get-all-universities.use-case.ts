import { University } from '../../entities/university.entity';
import { UniversityRepository } from '../../repositories/university.repository';

export class GetAllUniversitiesUseCase {
  constructor(private universityRepository: UniversityRepository) {}

  async execute(): Promise<University[]> {
    return this.universityRepository.findAll();
  }
}