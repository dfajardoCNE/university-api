import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SessionTime } from '../../../../domain/entities/session-time.entity';
import { SessionTimeRepository } from '../../../../domain/repositories/session-time.repository';

@Injectable()
export class SessionTimeRepositoryImpl implements SessionTimeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<SessionTime[]> {
    return this.prisma.sessionTime.findMany({
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' },
      ],
    });
  }

  async findById(id: number): Promise<SessionTime> {
    return this.prisma.sessionTime.findUnique({
      where: { id },
    });
  }

  async findByDayOfWeek(dayOfWeek: number): Promise<SessionTime[]> {
    return this.prisma.sessionTime.findMany({
      where: { dayOfWeek },
      orderBy: { startTime: 'asc' },
    });
  }

  async create(sessionTime: Partial<SessionTime>): Promise<SessionTime> {
    return this.prisma.sessionTime.create({
      data: sessionTime,
    });
  }

  async update(id: number, sessionTime: Partial<SessionTime>): Promise<SessionTime> {
    return this.prisma.sessionTime.update({
      where: { id },
      data: sessionTime,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.sessionTime.delete({
      where: { id },
    });
  }
}