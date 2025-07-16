import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Classroom } from '../../../../domain/entities/classroom.entity';
import { ClassroomRepository } from '../../../../domain/repositories/classroom.repository';

@Injectable()
export class ClassroomRepositoryImpl implements ClassroomRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Classroom[]> {
    return this.prisma.classroom.findMany();
  }

  async findById(id: number): Promise<Classroom> {
    return this.prisma.classroom.findUnique({
      where: { id },
    });
  }

  async findByCampus(campusId: number): Promise<Classroom[]> {
    return this.prisma.classroom.findMany({
      where: { campusId },
    });
  }

  async create(classroom: Partial<Classroom>): Promise<Classroom> {
    const { id, ...data } = classroom;
    return this.prisma.classroom.create({
      data: data as any,
    });
  }

  async update(id: number, classroom: Partial<Classroom>): Promise<Classroom> {
    const { id: _, ...data } = classroom;
    return this.prisma.classroom.update({
      where: { id },
      data: data as any,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.classroom.delete({
      where: { id },
    });
  }
}
