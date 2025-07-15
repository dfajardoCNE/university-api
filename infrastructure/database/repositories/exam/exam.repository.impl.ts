import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Exam } from '../../../../domain/entities/exam.entity';
import { ExamRepository } from '../../../../domain/repositories/exam.repository';

@Injectable()
export class ExamRepositoryImpl implements ExamRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Exam[]> {
    return this.prisma.exam.findMany({
      include: {
        course: true,
        professor: true,
      },
    });
  }

  async findById(id: number): Promise<Exam> {
    return this.prisma.exam.findUnique({
      where: { id },
      include: {
        course: true,
        professor: true,
      },
    });
  }

  async findByCourse(courseId: number): Promise<Exam[]> {
    return this.prisma.exam.findMany({
      where: { courseId },
      include: {
        professor: true,
      },
    });
  }

  async findByProfessor(professorId: number): Promise<Exam[]> {
    return this.prisma.exam.findMany({
      where: { professorId },
      include: {
        course: true,
      },
    });
  }

  async create(exam: Partial<Exam>): Promise<Exam> {
    return this.prisma.exam.create({
      data: exam,
      include: {
        course: true,
        professor: true,
      },
    });
  }

  async update(id: number, exam: Partial<Exam>): Promise<Exam> {
    return this.prisma.exam.update({
      where: { id },
      data: exam,
      include: {
        course: true,
        professor: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.exam.delete({
      where: { id },
    });
  }
}