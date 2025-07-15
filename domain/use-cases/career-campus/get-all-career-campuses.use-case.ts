import { CareerCampus } from '../../entities/career-campus.entity';
import { CareerCampusRepository } from '../../repositories/career-campus.repository';

export class GetAllCareerCampusesUseCase {
  constructor(private careerCampusRepository: CareerCampusRepository) {}

  async execute(): Promise<CareerCampus[]> {
    return this.careerCampusRepository.findAll();
  }
}