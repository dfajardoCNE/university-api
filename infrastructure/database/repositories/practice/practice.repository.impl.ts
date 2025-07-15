import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Practice } from '../../../../domain/entities/practice.entity';
import { PracticeRepository } from '../../../../domain/repositories/practice.repository';

@Injectable()
export class PracticeRepositoryImpl implements PracticeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Practice[]> {
    return this.prisma.practice.findMany({
      include: {
        course: true,
        professor: true,
      },
    });
  }

  async findById(id: number): Promise<Practice> {
    return this.prisma.practice.findUnique({
      where: { id },
      include: {
        course: true,
        professor: true,
      },
    });
  }

  async findByCourse(courseId: number): Promise<Practice[]> {
    return this.prisma.practice.findMany({
      where: { courseId },
      include: {
        professor: true,
      },
    });
  }

  async findByProfessor(professorId: number): Promise<Practice[]> {
    return this.prisma.practice.findMany({
      where: { professorId },
      include: {
        course: true,
      },
    });
  }

  async create(practice: Partial<Practice>): Promise<Practice> {
    return this.prisma.practice.create({
      data: practice,
      include: {
        course: true,
        professor: true,
      },
    });
  }

  async update(id: number, practice: Partial<Practice>): Promise<Practice> {
    return this.prisma.practice.update({
      where: { id },
      data: practice,
      include: {
        course: true,
        professor: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.practice.delete({
      where: { id },
    });
  }
}