import { Career } from '../../entities/career.entity';
import { CareerRepository } from '../../repositories/career.repository';

export class GetCareerByIdUseCase {
  constructor(private careerRepository: CareerRepository) {}

  async execute(id: number): Promise<Career> {
    return this.careerRepository.findById(id);
  }
}