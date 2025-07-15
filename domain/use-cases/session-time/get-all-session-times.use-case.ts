import { SessionTime } from '../../entities/session-time.entity';
import { SessionTimeRepository } from '../../repositories/session-time.repository';

export class GetAllSessionTimesUseCase {
  constructor(private sessionTimeRepository: SessionTimeRepository) {}

  async execute(): Promise<SessionTime[]> {
    return this.sessionTimeRepository.findAll();
  }
}