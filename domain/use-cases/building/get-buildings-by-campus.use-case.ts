import { Building } from '../../entities/building.entity';
import { BuildingRepository } from '../../repositories/building.repository';

export class GetBuildingsByCampusUseCase {
  constructor(private buildingRepository: BuildingRepository) {}

  async execute(campusId: number): Promise<Building[]> {
    return this.buildingRepository.findByCampus(campusId);
  }
}