import { Campus } from '../../entities/campus.entity';
import { CampusRepository } from '../../repositories/campus.repository';

export class GetCampusByIdUseCase {
  constructor(private campusRepository: CampusRepository) {}

  async execute(id: number): Promise<Campus> {
    return this.campusRepository.findById(id);
  }
}