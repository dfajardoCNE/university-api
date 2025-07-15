import { ThreadRepository } from '../../repositories/thread.repository';

export class DeleteThreadUseCase {
  constructor(private threadRepository: ThreadRepository) {}

  async execute(id: number): Promise<void> {
    return this.threadRepository.delete(id);
  }
}