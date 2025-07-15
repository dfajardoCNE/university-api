import { CareerCampus } from '../../entities/career-campus.entity';
import { CareerCampusRepository } from '../../repositories/career-campus.repository';

export class GetCareerCampusesByCampusUseCase {
  constructor(private careerCampusRepository: CareerCampusRepository) {}

  async execute(campusId: number): Promise<CareerCampus[]> {
    return this.careerCampusRepository.findByCampus(campusId);
  }
}