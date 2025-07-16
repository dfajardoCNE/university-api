import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Professor } from '../../../../domain/entities/professor.entity';
import { ProfessorRepository } from '../../../../domain/repositories/professor.repository';

@Injectable()
export class ProfessorRepositoryImpl implements ProfessorRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Professor[]> {
    return this.prisma.professor.findMany({
      include: {
        person: true,
      },
    });
  }

  async findById(id: number): Promise<Professor> {
    return this.prisma.professor.findUnique({
      where: { id },
      include: {
        person: true,
      },
    });
  }

  async findByPerson(personId: number): Promise<Professor> {
    return this.prisma.professor.findUnique({
      where: { personId },
      include: {
        person: true,
      },
    });
  }

  async create(professor: Partial<Professor>): Promise<Professor> {
    const { id, ...data } = professor;
    return this.prisma.professor.create({
      data: data as any,
      include: {
        person: true,
      },
    });
  }

  async update(id: number, professor: Partial<Professor>): Promise<Professor> {
    const { id: _, ...data } = professor;
    return this.prisma.professor.update({
      where: { id },
      data: data as any,
      include: {
        person: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.professor.delete({
      where: { id },
    });
  }
}
