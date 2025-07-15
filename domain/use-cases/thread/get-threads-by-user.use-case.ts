import { Thread } from '../../entities/thread.entity';
import { ThreadRepository } from '../../repositories/thread.repository';

export class GetThreadsByUserUseCase {
  constructor(private threadRepository: ThreadRepository) {}

  async execute(userId: number): Promise<Thread[]> {
    return this.threadRepository.findByUser(userId);
  }
}