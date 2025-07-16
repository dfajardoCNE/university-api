import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Assignment } from '../../../../domain/entities/assignment.entity';
import { AssignmentRepository } from '../../../../domain/repositories/assignment.repository';

@Injectable()
export class AssignmentRepositoryImpl implements AssignmentRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Assignment[]> {
    return this.prisma.assignment.findMany({
      include: {
        course: true,
        professor: true,
      },
    });
  }

  async findById(id: number): Promise<Assignment> {
    return this.prisma.assignment.findUnique({
      where: { id },
      include: {
        course: true,
        professor: true,
      },
    });
  }

  async findByCourse(courseId: number): Promise<Assignment[]> {
    return this.prisma.assignment.findMany({
      where: { courseId },
      include: {
        professor: true,
      },
    });
  }

  async findByProfessor(professorId: number): Promise<Assignment[]> {
    return this.prisma.assignment.findMany({
      where: { professorId },
      include: {
        course: true,
      },
    });
  }

  async create(assignment: Partial<Assignment>): Promise<Assignment> {
    const { id, ...data } = assignment;
    return this.prisma.assignment.create({
      data: data as any,
      include: {
        course: true,
        professor: true,
      },
    });
  }

  async update(id: number, assignment: Partial<Assignment>): Promise<Assignment> {
    const { id: _, ...data } = assignment;
    return this.prisma.assignment.update({
      where: { id },
      data: data as any,
      include: {
        course: true,
        professor: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.assignment.delete({
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
    
    // Buscar asignaciones del curso con fecha de entrega futura
    return this.prisma.assignment.findMany({
      where: {
        courseId: section.courseId,
        dueDate: {
          gt: now
        }
      },
      orderBy: {
        dueDate: 'asc'
      },
      include: {
        course: true
      }
    });
  }
}
