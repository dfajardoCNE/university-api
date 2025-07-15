import { Campus } from '../entities/campus.entity';

export interface CampusRepository {
  findAll(): Promise<Campus[]>;
  findById(id: number): Promise<Campus>;
  create(campus: Partial<Campus>): Promise<Campus>;
  update(id: number, campus: Partial<Campus>): Promise<Campus>;
  delete(id: number): Promise<void>;
}