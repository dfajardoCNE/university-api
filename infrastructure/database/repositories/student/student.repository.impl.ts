import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Student } from '../../../../domain/entities/student.entity';
import { StudentRepository } from '../../../../domain/repositories/student.repository';

@Injectable()
export class StudentRepositoryImpl implements StudentRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Student[]> {
    return this.prisma.student.findMany({
      include: {
        person: true,
        career: true,
        campus: true,
      },
    });
  }

  async findById(id: number): Promise<Student> {
    return this.prisma.student.findUnique({
      where: { id },
      include: {
        person: true,
        career: true,
        campus: true,
      },
    });
  }

  async findByPerson(personId: number): Promise<Student> {
    return this.prisma.student.findUnique({
      where: { personId },
      include: {
        person: true,
        career: true,
        campus: true,
      },
    });
  }

  async findByCareer(careerId: number): Promise<Student[]> {
    return this.prisma.student.findMany({
      where: { careerId },
      include: {
        person: true,
        career: true,
        campus: true,
      },
    });
  }

  async findByCampus(campusId: number): Promise<Student[]> {
    return this.prisma.student.findMany({
      where: { campusId },
      include: {
        person: true,
        career: true,
        campus: true,
      },
    });
  }

  async create(student: Partial<Student>): Promise<Student> {
    const { id, ...data } = student;
    return this.prisma.student.create({
      data: data as any,
      include: {
        person: true,
        career: true,
        campus: true,
      },
    });
  }

  async update(id: number, student: Partial<Student>): Promise<Student> {
    const { id: _, ...data } = student;
    return this.prisma.student.update({
      where: { id },
      data: data as any,
      include: {
        person: true,
        career: true,
        campus: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.student.delete({
      where: { id },
    });
  }
}
