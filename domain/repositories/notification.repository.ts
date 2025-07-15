import { Notification } from '../entities/notification.entity';

export interface NotificationRepository {
  findAll(): Promise<Notification[]>;
  findById(id: number): Promise<Notification>;
  findByUser(userId: number): Promise<Notification[]>;
  create(notification: Partial<Notification>): Promise<Notification>;
  update(id: number, notification: Partial<Notification>): Promise<Notification>;
  delete(id: number): Promise<void>;
}