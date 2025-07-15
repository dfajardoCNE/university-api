import { SessionTime } from '../../entities/session-time.entity';
import { SessionTimeRepository } from '../../repositories/session-time.repository';

export class CreateSessionTimeUseCase {
  constructor(private sessionTimeRepository: SessionTimeRepository) {}

  async execute(sessionTime: Partial<SessionTime>): Promise<SessionTime> {
    return this.sessionTimeRepository.create(sessionTime);
  }
}