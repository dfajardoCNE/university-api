import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationRepositoryImpl } from '../../../infrastructure/database/repositories/notification/notification.repository.impl';
import { GetNotificationsByUserUseCase } from '../../../domain/use-cases/notification/get-notifications-by-user.use-case';
import { CreateNotificationUseCase } from '../../../domain/use-cases/notification/create-notification.use-case';
import { DeleteNotificationUseCase } from '../../../domain/use-cases/notification/delete-notification.use-case';
import { NotificationRecipientModule } from '../notification-recipient/notification-recipient.module';

@Module({
  imports: [NotificationRecipientModule],
  controllers: [NotificationController],
  providers: [
    {
      provide: 'NotificationRepository',
      useClass: NotificationRepositoryImpl,
    },
    {
      provide: GetNotificationsByUserUseCase,
      useFactory: (repo) => new GetNotificationsByUserUseCase(repo),
      inject: ['NotificationRepository'],
    },
    {
      provide: CreateNotificationUseCase,
      useFactory: (repo) => new CreateNotificationUseCase(repo),
      inject: ['NotificationRepository'],
    },
    {
      provide: DeleteNotificationUseCase,
      useFactory: (repo) => new DeleteNotificationUseCase(repo),
      inject: ['NotificationRepository'],
    },
  ],
})
export class NotificationModule {}