import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Report } from '../../../../domain/entities/report.entity';
import { ReportRepository } from '../../../../domain/repositories/report.repository';

@Injectable()
export class ReportRepositoryImpl implements ReportRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Report[]> {
    return this.prisma.report.findMany({
      include: {
        thread: true,
        post: true,
        user: {
          include: {
            person: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number): Promise<Report> {
    return this.prisma.report.findUnique({
      where: { id },
      include: {
        thread: true,
        post: true,
        user: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async findByStatus(status: string): Promise<Report[]> {
    return this.prisma.report.findMany({
      where: { status },
      include: {
        thread: true,
        post: true,
        user: {
          include: {
            person: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByUser(userId: number): Promise<Report[]> {
    return this.prisma.report.findMany({
      where: { reportedBy: userId },
      include: {
        thread: true,
        post: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(report: Partial<Report>): Promise<Report> {
    return this.prisma.report.create({
      data: report,
      include: {
        thread: true,
        post: true,
        user: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async updateStatus(id: number, status: string): Promise<Report> {
    const data: any = { status };
    
    // Si el estado es 'resolved', agregar la fecha de resolución
    if (status === 'resolved') {
      data.resolvedAt = new Date();
    }
    
    return this.prisma.report.update({
      where: { id },
      data,
      include: {
        thread: true,
        post: true,
        user: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.report.delete({
      where: { id },
    });
  }
}