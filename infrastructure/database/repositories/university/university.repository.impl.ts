import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { University } from '../../../../domain/entities/university.entity';
import { UniversityRepository } from '../../../../domain/repositories/university.repository';

@Injectable()
export class UniversityRepositoryImpl implements UniversityRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<University[]> {
    return this.prisma.university.findMany({
      where: { deletedAt: null },
    });
  }

  async findById(id: number): Promise<University> {
    return this.prisma.university.findUnique({
      where: { id },
    });
  }

  async create(university: Partial<University>): Promise<University> {
    const { id, ...data } = university;
    return this.prisma.university.create({
      data: data as any,
    });
  }

  async update(id: number, university: Partial<University>): Promise<University> {
    const { id: _, ...data } = university;
    return this.prisma.university.update({
      where: { id },
      data: data as any,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.university.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
