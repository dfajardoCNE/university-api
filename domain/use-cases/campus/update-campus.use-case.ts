import { Campus } from '../../entities/campus.entity';
import { CampusRepository } from '../../repositories/campus.repository';

export class UpdateCampusUseCase {
  constructor(private campusRepository: CampusRepository) {}

  async execute(id: number, campus: Partial<Campus>): Promise<Campus> {
    return this.campusRepository.update(id, campus);
  }
}