import { Building } from '../../entities/building.entity';
import { BuildingRepository } from '../../repositories/building.repository';

export class UpdateBuildingUseCase {
  constructor(private buildingRepository: BuildingRepository) {}

  async execute(id: number, building: Partial<Building>): Promise<Building> {
    return this.buildingRepository.update(id, building);
  }
}