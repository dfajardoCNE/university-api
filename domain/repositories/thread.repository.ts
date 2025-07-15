import { Thread } from '../entities/thread.entity';

export interface ThreadRepository {
  findAll(): Promise<Thread[]>;
  findById(id: number): Promise<Thread>;
  findByUser(userId: number): Promise<Thread[]>;
  create(thread: Partial<Thread>): Promise<Thread>;
  update(id: number, thread: Partial<Thread>): Promise<Thread>;
  delete(id: number): Promise<void>;
}