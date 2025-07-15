import { NotificationRecipient } from '../entities/notification-recipient.entity';

export interface NotificationRecipientRepository {
  findByUser(userId: number): Promise<NotificationRecipient[]>;
  findByNotification(notificationId: number): Promise<NotificationRecipient[]>;
  create(recipient: Partial<NotificationRecipient>): Promise<NotificationRecipient>;
  markAsRead(id: number): Promise<NotificationRecipient>;
  delete(id: number): Promise<void>;
}