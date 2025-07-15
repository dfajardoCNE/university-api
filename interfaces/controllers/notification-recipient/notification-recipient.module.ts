import { Module } from '@nestjs/common';
import { NotificationRecipientController } from './notification-recipient.controller';
import { NotificationRecipientService } from './notification-recipient.service';
import { NotificationRecipientRepositoryImpl } from '../../../infrastructure/database/repositories/notification-recipient/notification-recipient.repository.impl';

@Module({
  controllers: [NotificationRecipientController],
  providers: [
    NotificationRecipientService,
    NotificationRecipientRepositoryImpl,
  ],
  exports: [NotificationRecipientService],
})
export class NotificationRecipientModule {}