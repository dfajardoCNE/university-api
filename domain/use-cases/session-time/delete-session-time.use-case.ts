import { SessionTimeRepository } from '../../repositories/session-time.repository';

export class DeleteSessionTimeUseCase {
  constructor(private sessionTimeRepository: SessionTimeRepository) {}

  async execute(id: number): Promise<void> {
    return this.sessionTimeRepository.delete(id);
  }
}