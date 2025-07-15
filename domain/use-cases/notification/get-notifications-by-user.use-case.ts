import { Notification } from '../../entities/notification.entity';
import { NotificationRepository } from '../../repositories/notification.repository';

export class GetNotificationsByUserUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(userId: number): Promise<Notification[]> {
    return this.notificationRepository.findByUser(userId);
  }
}