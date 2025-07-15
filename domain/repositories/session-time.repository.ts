import { SessionTime } from '../entities/session-time.entity';

export interface SessionTimeRepository {
  findAll(): Promise<SessionTime[]>;
  findById(id: number): Promise<SessionTime>;
  findByDayOfWeek(dayOfWeek: number): Promise<SessionTime[]>;
  create(sessionTime: Partial<SessionTime>): Promise<SessionTime>;
  update(id: number, sessionTime: Partial<SessionTime>): Promise<SessionTime>;
  delete(id: number): Promise<void>;
}