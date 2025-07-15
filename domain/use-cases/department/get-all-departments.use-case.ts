import { Department } from '../../entities/department.entity';
import { DepartmentRepository } from '../../repositories/department.repository';

export class GetAllDepartmentsUseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(): Promise<Department[]> {
    return this.departmentRepository.findAll();
  }
}