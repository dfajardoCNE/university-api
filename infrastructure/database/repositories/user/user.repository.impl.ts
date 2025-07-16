import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '../../../../domain/entities/user.entity';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { Request } from 'express';
import { Req } from '@nestjs/common';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        person: true,
        role: true,
      },
    });
    return users.map(user => ({
      ...user,
      password: user.passwordHash ?? '',
    })) as User[];
  }

  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        person: true,
        role: true,
      },
    });
    if (!user) return null;
    return {
      ...user,
      password: user.passwordHash ?? '',
    } as User;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        person: true,
        role: true,
      },
    });
    if (!user) return null;
    return {
      ...user,
      password: user.passwordHash ?? '',
    } as User;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        person: {
          email,
        },
      },
      include: {
        person: true,
        role: true,
      },
    });
    if (!user) return null;
    return {
      ...user,
      password: user.passwordHash ?? '', // Map passwordHash to password
    } as User;
  }

  async create(user: Partial<User>): Promise<User> {
    const { id, ...data } = user;
    const createdUser = await this.prisma.user.create({
      data: data as any,
      include: {
        person: true,
        role: true,
      },
    });
    // Ensure the returned object includes the required 'password' property
    return {
      ...createdUser,
      password: createdUser.passwordHash ?? '', // or handle as needed
    } as User;
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const { id: _, ...data } = user;
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: data as any,
      include: {
        person: true,
        role: true,
      },
    });

    // Ensure the returned object includes the required 'password' property
    return {
      ...updatedUser,
      password: updatedUser.passwordHash ?? '', // or handle as needed
    } as User;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  // Password reset methods
  async savePasswordResetToken(userId: number, tokenHash: string, expiresAt: Date): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        resetPasswordToken: tokenHash,
        resetPasswordExpires: expiresAt,
      },
    });
  }

  async verifyPasswordResetToken(userId: number, tokenHash: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        resetPasswordToken: true,
        resetPasswordExpires: true,
      },
    });

    if (!user || !user.resetPasswordToken || !user.resetPasswordExpires) {
      return false;
    }

    if (user.resetPasswordToken !== tokenHash) {
      return false;
    }

    if (user.resetPasswordExpires < new Date()) {
      return false;
    }

    return true;
  }

  async invalidatePasswordResetToken(userId: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });
  }

  async updatePassword(userId: number, passwordHash: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash,
      },
    });
  }
}
