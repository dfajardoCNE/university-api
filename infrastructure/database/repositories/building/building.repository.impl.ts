import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Building } from '../../../../domain/entities/building.entity';
import { BuildingRepository } from '../../../../domain/repositories/building.repository';

@Injectable()
export class BuildingRepositoryImpl implements BuildingRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Building[]> {
    return this.prisma.building.findMany({
      include: {
        campus: true,
      },
    });
  }

  async findById(id: number): Promise<Building> {
    return this.prisma.building.findUnique({
      where: { id },
      include: {
        campus: true,
      },
    });
  }

  async findByCampus(campusId: number): Promise<Building[]> {
    return this.prisma.building.findMany({
      where: { campusId },
      include: {
        campus: true,
      },
    });
  }

  async create(building: Partial<Building>): Promise<Building> {
    return this.prisma.building.create({
      data: building,
      include: {
        campus: true,
      },
    });
  }

  async update(id: number, building: Partial<Building>): Promise<Building> {
    return this.prisma.building.update({
      where: { id },
      data: building,
      include: {
        campus: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.building.delete({
      where: { id },
    });
  }
}