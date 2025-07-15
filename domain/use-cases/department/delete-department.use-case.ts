import { DepartmentRepository } from '../../repositories/department.repository';

export class DeleteDepartmentUseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(id: number): Promise<void> {
    return this.departmentRepository.delete(id);
  }
}