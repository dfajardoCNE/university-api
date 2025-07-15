import { Department } from '../../entities/department.entity';
import { DepartmentRepository } from '../../repositories/department.repository';

export class GetDepartmentByIdUseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(id: number): Promise<Department> {
    return this.departmentRepository.findById(id);
  }
}