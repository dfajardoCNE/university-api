import { Injectable } from '@nestjs/common';
import { NotificationRecipientRepositoryImpl } from '../../../infrastructure/database/repositories/notification-recipient/notification-recipient.repository.impl';
import { NotificationRecipient } from '../../../domain/entities/notification-recipient.entity';

@Injectable()
export class NotificationRecipientService {
  constructor(private repository: NotificationRecipientRepositoryImpl) {}

  async findByUser(userId: number): Promise<NotificationRecipient[]> {
    return this.repository.findByUser(userId);
  }

  async create(data: { notificationId: number; userId: number }): Promise<NotificationRecipient> {
    return this.repository.create({
      notificationId: data.notificationId,
      userId: data.userId,
      isRead: false,
    });
  }

  async markAsRead(id: number): Promise<NotificationRecipient> {
    return this.repository.markAsRead(id);
  }
}