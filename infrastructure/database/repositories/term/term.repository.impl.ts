import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Term } from '../../../../domain/entities/term.entity';
import { TermRepository } from '../../../../domain/repositories/term.repository';

@Injectable()
export class TermRepositoryImpl implements TermRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Term[]> {
    return this.prisma.term.findMany({
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  async findById(id: number): Promise<Term> {
    return this.prisma.term.findUnique({
      where: { id },
    });
  }

  async findCurrent(): Promise<Term> {
    const today = new Date();
    return this.prisma.term.findFirst({
      where: {
        startDate: {
          lte: today,
        },
        endDate: {
          gte: today,
        },
      },
    });
  }

  async create(term: Partial<Term>): Promise<Term> {
    return this.prisma.term.create({
      data: term,
    });
  }

  async update(id: number, term: Partial<Term>): Promise<Term> {
    return this.prisma.term.update({
      where: { id },
      data: term,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.term.delete({
      where: { id },
    });
  }
}