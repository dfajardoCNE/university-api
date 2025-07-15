import { Notification } from '../../entities/notification.entity';
import { NotificationRepository } from '../../repositories/notification.repository';

export class CreateNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(notification: Partial<Notification>): Promise<Notification> {
    return this.notificationRepository.create(notification);
  }
}