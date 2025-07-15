import { Thread } from '../../entities/thread.entity';
import { ThreadRepository } from '../../repositories/thread.repository';

export class UpdateThreadUseCase {
  constructor(private threadRepository: ThreadRepository) {}

  async execute(id: number, thread: Partial<Thread>): Promise<Thread> {
    return this.threadRepository.update(id, thread);
  }
}