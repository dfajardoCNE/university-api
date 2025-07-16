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
    const { id, ...data } = exam;
    return this.prisma.exam.create({
      data: data as any,
      include: {
        course: true,
        professor: true,
      },
    });
  }

  async update(id: number, exam: Partial<Exam>): Promise<Exam> {
    const { id: _, ...data } = exam;
    return this.prisma.exam.update({
      where: { id },
      data: data as any,
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

  async findUpcomingBySection(sectionId: number): Promise<any[]> {
    const now = new Date();
    
    // Obtener el curso asociado a la sección
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      select: { courseId: true }
    });
    
    if (!section) {
      return [];
    }
    
    // Buscar exámenes del curso con fecha futura
    return this.prisma.exam.findMany({
      where: {
        courseId: section.courseId,
        examDate: {
          gt: now
        }
      },
      orderBy: {
        examDate: 'asc'
      },
      include: {
        course: true
      }
    });
  }
}
