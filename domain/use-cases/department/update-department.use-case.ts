import { Department } from '../../entities/department.entity';
import { DepartmentRepository } from '../../repositories/department.repository';

export class UpdateDepartmentUseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(id: number, department: Partial<Department>): Promise<Department> {
    return this.departmentRepository.update(id, department);
  }
}