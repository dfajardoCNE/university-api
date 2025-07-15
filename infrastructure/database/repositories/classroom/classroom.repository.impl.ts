import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Classroom } from '../../../../domain/entities/classroom.entity';
import { ClassroomRepository } from '../../../../domain/repositories/classroom.repository';

@Injectable()
export class ClassroomRepositoryImpl implements ClassroomRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Classroom[]> {
    return this.prisma.classroom.findMany({
      include: {
        building: true,
      },
    });
  }

  async findById(id: number): Promise<Classroom> {
    return this.prisma.classroom.findUnique({
      where: { id },
      include: {
        building: true,
      },
    });
  }

  async findByBuilding(buildingId: number): Promise<Classroom[]> {
    return this.prisma.classroom.findMany({
      where: { buildingId },
      include: {
        building: true,
      },
    });
  }

  async create(classroom: Partial<Classroom>): Promise<Classroom> {
    return this.prisma.classroom.create({
      data: classroom,
      include: {
        building: true,
      },
    });
  }

  async update(id: number, classroom: Partial<Classroom>): Promise<Classroom> {
    return this.prisma.classroom.update({
      where: { id },
      data: classroom,
      include: {
        building: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.classroom.delete({
      where: { id },
    });
  }
}