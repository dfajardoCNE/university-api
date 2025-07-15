import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationRecipient } from '../../../../domain/entities/notification-recipient.entity';
import { NotificationRecipientRepository } from '../../../../domain/repositories/notification-recipient.repository';

@Injectable()
export class NotificationRecipientRepositoryImpl implements NotificationRecipientRepository {
  constructor(private prisma: PrismaService) {}

  async findByUser(userId: number): Promise<NotificationRecipient[]> {
    return this.prisma.notificationRecipient.findMany({
      where: { userId },
      include: {
        notification: true,
        user: {
          include: {
            person: true,
          },
        },
      },
      orderBy: {
        notification: {
          createdAt: 'desc',
        },
      },
    });
  }

  async findByNotification(notificationId: number): Promise<NotificationRecipient[]> {
    return this.prisma.notificationRecipient.findMany({
      where: { notificationId },
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async create(recipient: Partial<NotificationRecipient>): Promise<NotificationRecipient> {
    return this.prisma.notificationRecipient.create({
      data: recipient,
      include: {
        notification: true,
        user: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async markAsRead(id: number): Promise<NotificationRecipient> {
    return this.prisma.notificationRecipient.update({
      where: { id },
      data: {
        isRead: true,
        readAt: new Date(),
      },
      include: {
        notification: true,
        user: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.notificationRecipient.delete({
      where: { id },
    });
  }
}