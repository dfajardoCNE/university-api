import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Application } from '../../../../domain/entities/application.entity';
import { ApplicationRepository } from '../../../../domain/repositories/application.repository';

@Injectable()
export class ApplicationRepositoryImpl implements ApplicationRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Application[]> {
    return this.prisma.application.findMany({
      include: {
        person: true,
        career: true,
        documents: true,
      },
    });
  }

  async findById(id: number): Promise<Application> {
    return this.prisma.application.findUnique({
      where: { id },
      include: {
        person: true,
        career: true,
        documents: true,
      },
    });
  }

  async findByPerson(personId: number): Promise<Application[]> {
    return this.prisma.application.findMany({
      where: { personId },
      include: {
        career: true,
        documents: true,
      },
    });
  }

  async findByCareer(careerId: number): Promise<Application[]> {
    return this.prisma.application.findMany({
      where: { careerId },
      include: {
        person: true,
        documents: true,
      },
    });
  }

  async findByCampus(campusId: number): Promise<Application[]> {
    return this.prisma.application.findMany({
      where: { campusId },
      include: {
        person: true,
        career: true,
        documents: true,
      },
    });
  }

  async findByStatus(status: string): Promise<Application[]> {
    return this.prisma.application.findMany({
      where: { status },
      include: {
        person: true,
        career: true,
        documents: true,
      },
    });
  }

  async create(application: Partial<Application>): Promise<Application> {
    const { id, ...data } = application;
    return this.prisma.application.create({
      data: data as any,
      include: {
        person: true,
        career: true,
      },
    });
  }

  async update(id: number, application: Partial<Application>): Promise<Application> {
    const { id: _, ...data } = application;
    return this.prisma.application.update({
      where: { id },
      data: data as any,
      include: {
        person: true,
        career: true,
        documents: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.application.delete({
      where: { id },
    });
  }
}
