import { Practice } from '../../entities/practice.entity';
import { PracticeRepository } from '../../repositories/practice.repository';

export class CreatePracticeUseCase {
  constructor(private practiceRepository: PracticeRepository) {}

  async execute(practice: Partial<Practice>): Promise<Practice> {
    return this.practiceRepository.create(practice);
  }
}