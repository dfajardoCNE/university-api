import { Career } from '../../entities/career.entity';
import { CareerRepository } from '../../repositories/career.repository';

export class GetAllCareersUseCase {
  constructor(private careerRepository: CareerRepository) {}

  async execute(): Promise<Career[]> {
    return this.careerRepository.findAll();
  }
}