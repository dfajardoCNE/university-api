import { Department } from '../../entities/department.entity';
import { DepartmentRepository } from '../../repositories/department.repository';

export class GetDepartmentsByFacultyUseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(facultyId: number): Promise<Department[]> {
    return this.departmentRepository.findByFaculty(facultyId);
  }
}