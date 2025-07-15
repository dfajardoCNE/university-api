import { SessionTime } from '../../entities/session-time.entity';
import { SessionTimeRepository } from '../../repositories/session-time.repository';

export class UpdateSessionTimeUseCase {
  constructor(private sessionTimeRepository: SessionTimeRepository) {}

  async execute(id: number, sessionTime: Partial<SessionTime>): Promise<SessionTime> {
    return this.sessionTimeRepository.update(id, sessionTime);
  }
}