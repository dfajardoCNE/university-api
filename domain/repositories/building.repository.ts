import { Building } from '../entities/building.entity';

export interface BuildingRepository {
  findAll(): Promise<Building[]>;
  findById(id: number): Promise<Building>;
  findByCampus(campusId: number): Promise<Building[]>;
  create(building: Partial<Building>): Promise<Building>;
  update(id: number, building: Partial<Building>): Promise<Building>;
  delete(id: number): Promise<void>;
}