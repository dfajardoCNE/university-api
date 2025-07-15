import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Career } from '../../../../domain/entities/career.entity';
import { CareerRepository } from '../../../../domain/repositories/career.repository';

@Injectable()
export class CareerRepositoryImpl implements CareerRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Career[]> {
    return this.prisma.career.findMany({
      include: {
        department: true,
      },
    });
  }

  async findById(id: number): Promise<Career> {
    return this.prisma.career.findUnique({
      where: { id },
      include: {
        department: true,
      },
    });
  }

  async findByDepartment(departmentId: number): Promise<Career[]> {
    return this.prisma.career.findMany({
      where: { departmentId },
      include: {
        department: true,
      },
    });
  }

  async create(career: Partial<Career>): Promise<Career> {
    return this.prisma.career.create({
      data: career,
      include: {
        department: true,
      },
    });
  }

  async update(id: number, career: Partial<Career>): Promise<Career> {
    return this.prisma.career.update({
      where: { id },
      data: career,
      include: {
        department: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.career.delete({
      where: { id },
    });
  }
}