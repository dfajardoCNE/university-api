import { Campus } from '../../entities/campus.entity';
import { CampusRepository } from '../../repositories/campus.repository';

export class CreateCampusUseCase {
  constructor(private campusRepository: CampusRepository) {}

  async execute(campus: Partial<Campus>): Promise<Campus> {
    return this.campusRepository.create(campus);
  }
}