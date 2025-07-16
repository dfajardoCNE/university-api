import { User } from '../entities/user.entity';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  findByUsername(username: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(user: Partial<User>): Promise<User>;
  update(id: number, user: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
  
  // Password reset methods
  savePasswordResetToken(userId: number, tokenHash: string, expiresAt: Date): Promise<void>;
  verifyPasswordResetToken(userId: number, tokenHash: string): Promise<boolean>;
  invalidatePasswordResetToken(userId: number): Promise<void>;
  updatePassword(userId: number, passwordHash: string): Promise<void>;
}