import { Career } from '../../entities/career.entity';
import { CareerRepository } from '../../repositories/career.repository';

export class UpdateCareerUseCase {
  constructor(private careerRepository: CareerRepository) {}

  async execute(id: number, career: Partial<Career>): Promise<Career> {
    return this.careerRepository.update(id, career);
  }
}