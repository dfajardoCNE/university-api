import { Career } from '../entities/career.entity';

export interface CareerRepository {
  findAll(): Promise<Career[]>;
  findById(id: number): Promise<Career>;
  findByDepartment(departmentId: number): Promise<Career[]>;
  create(career: Partial<Career>): Promise<Career>;
  update(id: number, career: Partial<Career>): Promise<Career>;
  delete(id: number): Promise<void>;
}