import { Practice } from '../../entities/practice.entity';
import { PracticeRepository } from '../../repositories/practice.repository';

export class GetAllPracticesUseCase {
  constructor(private practiceRepository: PracticeRepository) {}

  async execute(): Promise<Practice[]> {
    return this.practiceRepository.findAll();
  }
}