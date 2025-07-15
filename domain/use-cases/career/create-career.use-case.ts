import { Career } from '../../entities/career.entity';
import { CareerRepository } from '../../repositories/career.repository';

export class CreateCareerUseCase {
  constructor(private careerRepository: CareerRepository) {}

  async execute(career: Partial<Career>): Promise<Career> {
    return this.careerRepository.create(career);
  }
}