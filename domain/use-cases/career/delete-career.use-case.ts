import { CareerRepository } from '../../repositories/career.repository';

export class DeleteCareerUseCase {
  constructor(private careerRepository: CareerRepository) {}

  async execute(id: number): Promise<void> {
    return this.careerRepository.delete(id);
  }
}