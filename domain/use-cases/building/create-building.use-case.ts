import { Building } from '../../entities/building.entity';
import { BuildingRepository } from '../../repositories/building.repository';

export class CreateBuildingUseCase {
  constructor(private buildingRepository: BuildingRepository) {}

  async execute(building: Partial<Building>): Promise<Building> {
    return this.buildingRepository.create(building);
  }
}