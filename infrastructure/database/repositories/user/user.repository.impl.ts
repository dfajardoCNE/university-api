import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '../../../../domain/entities/user.entity';
import { UserRepository } from '../../../../domain/repositories/user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        person: true,
        role: true,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        person: true,
        role: true,
      },
    });
  }

  async findByUsername(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { username },
      include: {
        person: true,
        role: true,
      },
    });
  }

  async create(user: Partial<User>): Promise<User> {
    const { id, ...data } = user;
    return this.prisma.user.create({
      data: data as any,
      include: {
        person: true,
        role: true,
      },
    });
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const { id: _, ...data } = user;
    return this.prisma.user.update({
      where: { id },
      data: data as any,
      include: {
        person: true,
        role: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
