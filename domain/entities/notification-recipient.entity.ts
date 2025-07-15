export class NotificationRecipient {
  id: number;
  notificationId: number;
  userId: number;
  isRead: boolean;
  readAt?: Date;
}