import { Building } from '../../entities/building.entity';
import { BuildingRepository } from '../../repositories/building.repository';

export class GetBuildingByIdUseCase {
  constructor(private buildingRepository: BuildingRepository) {}

  async execute(id: number): Promise<Building> {
    return this.buildingRepository.findById(id);
  }
}