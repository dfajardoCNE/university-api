import { BuildingRepository } from '../../repositories/building.repository';

export class DeleteBuildingUseCase {
  constructor(private buildingRepository: BuildingRepository) {}

  async execute(id: number): Promise<void> {
    return this.buildingRepository.delete(id);
  }
}