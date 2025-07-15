import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Thread } from '../../../../domain/entities/thread.entity';
import { ThreadRepository } from '../../../../domain/repositories/thread.repository';

@Injectable()
export class ThreadRepositoryImpl implements ThreadRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Thread[]> {
    return this.prisma.thread.findMany({
      include: {
        user: {
          include: {
            person: true,
          },
        },
        posts: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number): Promise<Thread> {
    return this.prisma.thread.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            person: true,
          },
        },
        posts: {
          include: {
            user: {
              include: {
                person: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  async findByUser(userId: number): Promise<Thread[]> {
    return this.prisma.thread.findMany({
      where: { userId },
      include: {
        posts: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(thread: Partial<Thread>): Promise<Thread> {
    return this.prisma.thread.create({
      data: thread,
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async update(id: number, thread: Partial<Thread>): Promise<Thread> {
    return this.prisma.thread.update({
      where: { id },
      data: {
        ...thread,
        updatedAt: new Date(),
      },
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
    await this.prisma.thread.delete({
      where: { id },
    });
  }
}