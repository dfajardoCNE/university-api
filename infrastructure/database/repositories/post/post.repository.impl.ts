import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Post } from '../../../../domain/entities/post.entity';
import { PostRepository } from '../../../../domain/repositories/post.repository';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        user: {
          include: {
            person: true,
          },
        },
        thread: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number): Promise<Post> {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            person: true,
          },
        },
        thread: true,
      },
    });
  }

  async findByThread(threadId: number): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { threadId },
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
    });
  }

  async findByUser(userId: number): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { userId },
      include: {
        thread: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(post: Partial<Post>): Promise<Post> {
    const { id, ...data } = post;
    return this.prisma.post.create({
      data: data as any,
      include: {
        user: {
          include: {
            person: true,
          },
        },
        thread: true,
      },
    });
  }

  async update(id: number, post: Partial<Post>): Promise<Post> {
    const { id: _, ...data } = post;
    return this.prisma.post.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      } as any,
      include: {
        user: {
          include: {
            person: true,
          },
        },
        thread: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.post.delete({
      where: { id },
    });
  }
}
