import { SessionTime } from '../../entities/session-time.entity';
import { SessionTimeRepository } from '../../repositories/session-time.repository';

export class GetSessionTimesByDayUseCase {
  constructor(private sessionTimeRepository: SessionTimeRepository) {}

  async execute(dayOfWeek: number): Promise<SessionTime[]> {
    return this.sessionTimeRepository.findByDayOfWeek(dayOfWeek);
  }
}