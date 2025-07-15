import { CareerCampus } from '../../entities/career-campus.entity';
import { CareerCampusRepository } from '../../repositories/career-campus.repository';

export class GetCareerCampusesByCareerUseCase {
  constructor(private careerCampusRepository: CareerCampusRepository) {}

  async execute(careerId: number): Promise<CareerCampus[]> {
    return this.careerCampusRepository.findByCareer(careerId);
  }
}