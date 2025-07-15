import { Thread } from '../../entities/thread.entity';
import { ThreadRepository } from '../../repositories/thread.repository';

export class CreateThreadUseCase {
  constructor(private threadRepository: ThreadRepository) {}

  async execute(thread: Partial<Thread>): Promise<Thread> {
    return this.threadRepository.create(thread);
  }
}