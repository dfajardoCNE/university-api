import { Building } from '../../entities/building.entity';
import { BuildingRepository } from '../../repositories/building.repository';

export class GetAllBuildingsUseCase {
  constructor(private buildingRepository: BuildingRepository) {}

  async execute(): Promise<Building[]> {
    return this.buildingRepository.findAll();
  }
}