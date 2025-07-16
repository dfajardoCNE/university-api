import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Faculty } from '../../../../domain/entities/faculty.entity';
import { FacultyRepository } from '../../../../domain/repositories/faculty.repository';

@Injectable()
export class FacultyRepositoryImpl implements FacultyRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Faculty[]> {
    return this.prisma.faculty.findMany({
      where: { deletedAt: null },
    });
  }

  async findById(id: number): Promise<Faculty> {
    return this.prisma.faculty.findUnique({
      where: { id },
    });
  }

  async findByUniversity(universityId: number): Promise<Faculty[]> {
    return this.prisma.faculty.findMany({
      where: { 
        universityId,
        deletedAt: null 
      },
    });
  }

  async create(faculty: Partial<Faculty>): Promise<Faculty> {
    const { id, ...data } = faculty;
    return this.prisma.faculty.create({
      data: data as any,
    });
  }

  async update(id: number, faculty: Partial<Faculty>): Promise<Faculty> {
    const { id: _, ...data } = faculty;
    return this.prisma.faculty.update({
      where: { id },
      data: data as any,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.faculty.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
