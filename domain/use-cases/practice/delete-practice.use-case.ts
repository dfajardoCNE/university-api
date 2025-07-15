import { PracticeRepository } from '../../repositories/practice.repository';

export class DeletePracticeUseCase {
  constructor(private practiceRepository: PracticeRepository) {}

  async execute(id: number): Promise<void> {
    return this.practiceRepository.delete(id);
  }
}