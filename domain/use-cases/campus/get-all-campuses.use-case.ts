import { Campus } from '../../entities/campus.entity';
import { CampusRepository } from '../../repositories/campus.repository';

export class GetAllCampusesUseCase {
  constructor(private campusRepository: CampusRepository) {}

  async execute(): Promise<Campus[]> {
    return this.campusRepository.findAll();
  }
}