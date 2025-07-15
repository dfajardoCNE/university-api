import { SessionTime } from '../../entities/session-time.entity';
import { SessionTimeRepository } from '../../repositories/session-time.repository';

export class GetSessionTimeByIdUseCase {
  constructor(private sessionTimeRepository: SessionTimeRepository) {}

  async execute(id: number): Promise<SessionTime> {
    return this.sessionTimeRepository.findById(id);
  }
}