import { Department } from '../entities/department.entity';

export interface DepartmentRepository {
  findAll(): Promise<Department[]>;
  findById(id: number): Promise<Department>;
  findByFaculty(facultyId: number): Promise<Department[]>;
  create(department: Partial<Department>): Promise<Department>;
  update(id: number, department: Partial<Department>): Promise<Department>;
  delete(id: number): Promise<void>;
}