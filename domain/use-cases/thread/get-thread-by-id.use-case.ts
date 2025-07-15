import { Thread } from '../../entities/thread.entity';
import { ThreadRepository } from '../../repositories/thread.repository';

export class GetThreadByIdUseCase {
  constructor(private threadRepository: ThreadRepository) {}

  async execute(id: number): Promise<Thread> {
    return this.threadRepository.findById(id);
  }
}