import { Department } from '../../entities/department.entity';
import { DepartmentRepository } from '../../repositories/department.repository';

export class CreateDepartmentUseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(department: Partial<Department>): Promise<Department> {
    return this.departmentRepository.create(department);
  }
}