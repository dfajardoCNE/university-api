import { Career } from '../../entities/career.entity';
import { CareerRepository } from '../../repositories/career.repository';

export class GetCareersByDepartmentUseCase {
  constructor(private careerRepository: CareerRepository) {}

  async execute(departmentId: number): Promise<Career[]> {
    return this.careerRepository.findByDepartment(departmentId);
  }
}