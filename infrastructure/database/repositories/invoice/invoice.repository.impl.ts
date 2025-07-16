import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Invoice } from '../../../../domain/entities/invoice.entity';
import { InvoiceRepository } from '../../../../domain/repositories/invoice.repository';

@Injectable()
export class InvoiceRepositoryImpl implements InvoiceRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Invoice[]> {
    return this.prisma.invoice.findMany();
  }

  async findById(id: number): Promise<Invoice> {
    return this.prisma.invoice.findUnique({
      where: { id },
    });
  }

  async findByStudent(studentId: number): Promise<Invoice[]> {
    return this.prisma.invoice.findMany({
      where: { studentId },
      orderBy: { dueDate: 'asc' },
    });
  }

  async findByStatus(status: string): Promise<Invoice[]> {
    return this.prisma.invoice.findMany({
      where: { status },
    });
  }

  async findByTerm(termId: number): Promise<Invoice[]> {
    return this.prisma.invoice.findMany({
      where: { termId },
    });
  }

  async findByStudentAndTerm(studentId: number, termId: number): Promise<Invoice[]> {
    return this.prisma.invoice.findMany({
      where: {
        studentId,
        termId,
      },
    });
  }

  async findPendingByStudent(studentId: number): Promise<Invoice[]> {
    return this.prisma.invoice.findMany({
      where: {
        studentId,
        status: {
          in: ['pending', 'overdue', 'partially_paid'],
        },
      },
      orderBy: { dueDate: 'asc' },
    });
  }

  async create(invoice: Partial<Invoice>): Promise<Invoice> {
    return this.prisma.invoice.create({
      data: invoice as any,
    });
  }

  async update(id: number, invoice: Partial<Invoice>): Promise<Invoice> {
    return this.prisma.invoice.update({
      where: { id },
      data: invoice,
    });
  }

  async updateStatus(id: number, status: string): Promise<Invoice> {
    return this.prisma.invoice.update({
      where: { id },
      data: { status },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.invoice.delete({
      where: { id },
    });
  }
}