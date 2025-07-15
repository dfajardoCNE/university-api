import { Practice } from '../../entities/practice.entity';
import { PracticeRepository } from '../../repositories/practice.repository';

export class GetPracticeByIdUseCase {
  constructor(private practiceRepository: PracticeRepository) {}

  async execute(id: number): Promise<Practice> {
    return this.practiceRepository.findById(id);
  }
}