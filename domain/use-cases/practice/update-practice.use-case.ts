import { Practice } from '../../entities/practice.entity';
import { PracticeRepository } from '../../repositories/practice.repository';

export class UpdatePracticeUseCase {
  constructor(private practiceRepository: PracticeRepository) {}

  async execute(id: number, practice: Partial<Practice>): Promise<Practice> {
    return this.practiceRepository.update(id, practice);
  }
}