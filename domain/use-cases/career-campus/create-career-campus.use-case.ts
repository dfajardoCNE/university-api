import { CareerCampus } from '../../entities/career-campus.entity';
import { CareerCampusRepository } from '../../repositories/career-campus.repository';

export class CreateCareerCampusUseCase {
  constructor(private careerCampusRepository: CareerCampusRepository) {}

  async execute(careerCampus: CareerCampus): Promise<CareerCampus> {
    return this.careerCampusRepository.create(careerCampus);
  }
}