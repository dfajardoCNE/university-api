import { CampusRepository } from '../../repositories/campus.repository';

export class DeleteCampusUseCase {
  constructor(private campusRepository: CampusRepository) {}

  async execute(id: number): Promise<void> {
    return this.campusRepository.delete(id);
  }
}