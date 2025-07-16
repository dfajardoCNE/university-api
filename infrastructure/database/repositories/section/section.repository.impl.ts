import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Section } from '../../../../domain/entities/section.entity';
import { SectionRepository } from '../../../../domain/repositories/section.repository';

@Injectable()
export class SectionRepositoryImpl implements SectionRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Section[]> {
    return this.prisma.section.findMany({
      include: {
        course: true,
        professor: true,
        classroom: true,
      },
    });
  }

  async findById(id: number): Promise<Section> {
    return this.prisma.section.findUnique({
      where: { id },
      include: {
        course: true,
        professor: true,
        classroom: true,
      },
    });
  }

  async findByCourse(courseId: number): Promise<Section[]> {
    return this.prisma.section.findMany({
      where: { courseId },
      include: {
        course: true,
        professor: true,
        classroom: true,
      },
    });
  }

  async findByProfessor(professorId: number): Promise<Section[]> {
    return this.prisma.section.findMany({
      where: { professorId },
      include: {
        course: true,
        professor: true,
        classroom: true,
      },
    });
  }

  async findByTerm(termId: number): Promise<Section[]> {
    return this.prisma.section.findMany({
      where: { termId },
      include: {
        course: true,
        professor: true,
        classroom: true,
      },
    });
  }

  async create(section: Partial<Section>): Promise<Section> {
    const { id, ...data } = section;
    return this.prisma.section.create({
      data: data as any,
      include: {
        course: true,
        professor: true,
        classroom: true,
      },
    });
  }

  async update(id: number, section: Partial<Section>): Promise<Section> {
    const { id: _, ...data } = section;
    return this.prisma.section.update({
      where: { id },
      data: data as any,
      include: {
        course: true,
        professor: true,
        classroom: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.section.delete({
      where: { id },
    });
  }
}
