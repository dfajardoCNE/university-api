import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Notification } from '../../../../domain/entities/notification.entity';
import { NotificationRepository } from '../../../../domain/repositories/notification.repository';

@Injectable()
export class NotificationRepositoryImpl implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      include: {
        user: {
          include: {
            person: true,
          },
        },
        recipients: {
          include: {
            user: {
              include: {
                person: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number): Promise<Notification> {
    return this.prisma.notification.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            person: true,
          },
        },
        recipients: {
          include: {
            user: {
              include: {
                person: true,
              },
            },
          },
        },
      },
    });
  }

  async findByUser(userId: number): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: { userId },
      include: {
        recipients: {
          include: {
            user: {
              include: {
                person: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(notification: Partial<Notification>): Promise<Notification> {
    const { id, ...data } = notification;
    return this.prisma.notification.create({
      data: data as any,
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async update(id: number, notification: Partial<Notification>): Promise<Notification> {
    const { id: _, ...data } = notification;
    return this.prisma.notification.update({
      where: { id },
      data: data as any,
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.notification.delete({
      where: { id },
    });
  }
}
