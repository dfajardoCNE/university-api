import { NotificationRepository } from '../../repositories/notification.repository';

export class DeleteNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(id: number): Promise<void> {
    return this.notificationRepository.delete(id);
  }
}