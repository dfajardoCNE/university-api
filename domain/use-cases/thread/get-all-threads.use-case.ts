import { Thread } from '../../entities/thread.entity';
import { ThreadRepository } from '../../repositories/thread.repository';

export class GetAllThreadsUseCase {
  constructor(private threadRepository: ThreadRepository) {}

  async execute(): Promise<Thread[]> {
    return this.threadRepository.findAll();
  }
}