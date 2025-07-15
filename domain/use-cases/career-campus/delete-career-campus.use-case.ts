import { CareerCampusRepository } from '../../repositories/career-campus.repository';

export class DeleteCareerCampusUseCase {
  constructor(private careerCampusRepository: CareerCampusRepository) {}

  async execute(careerId: number, campusId: number): Promise<void> {
    return this.careerCampusRepository.delete(careerId, campusId);
  }
}