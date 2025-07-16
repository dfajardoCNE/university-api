import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Payment } from '../../../../domain/entities/payment.entity';
import { PaymentRepository } from '../../../../domain/repositories/payment.repository';

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Payment[]> {
    return this.prisma.payment.findMany();
  }

  async findById(id: number): Promise<Payment> {
    return this.prisma.payment.findUnique({
      where: { id },
    });
  }

  async findByStudent(studentId: number): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: { studentId },
      orderBy: { paymentDate: 'desc' },
    });
  }

  async findByStatus(status: string): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: { status },
    });
  }

  async findByTerm(termId: number): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: { termId },
    });
  }

  async findByStudentAndTerm(studentId: number, termId: number): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: {
        studentId,
        termId,
      },
    });
  }

  async create(payment: Partial<Payment>): Promise<Payment> {
    return this.prisma.payment.create({
      data: payment as any,
    });
  }

  async update(id: number, payment: Partial<Payment>): Promise<Payment> {
    return this.prisma.payment.update({
      where: { id },
      data: payment,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.payment.delete({
      where: { id },
    });
  }

  async findRecent(limit: number): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      take: limit,
      orderBy: { paymentDate: 'desc' },
      include: {
        student: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async getMonthlyRevenue(): Promise<number> {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const result = await this.prisma.payment.aggregate({
      where: {
        paymentDate: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
        status: 'completed',
      },
      _sum: {
        amount: true,
      },
    });

    return result._sum.amount || 0;
  }
}