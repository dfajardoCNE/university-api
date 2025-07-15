import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CareerCampus } from '../../../../domain/entities/career-campus.entity';
import { CareerCampusRepository } from '../../../../domain/repositories/career-campus.repository';

@Injectable()
export class CareerCampusRepositoryImpl implements CareerCampusRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CareerCampus[]> {
    return this.prisma.careerCampus.findMany({
      include: {
        career: true,
        campus: true,
      },
    });
  }

  async findByCareer(careerId: number): Promise<CareerCampus[]> {
    return this.prisma.careerCampus.findMany({
      where: { careerId },
      include: {
        campus: true,
      },
    });
  }

  async findByCampus(campusId: number): Promise<CareerCampus[]> {
    return this.prisma.careerCampus.findMany({
      where: { campusId },
      include: {
        career: true,
      },
    });
  }

  async create(careerCampus: CareerCampus): Promise<CareerCampus> {
    return this.prisma.careerCampus.create({
      data: careerCampus,
      include: {
        career: true,
        campus: true,
      },
    });
  }

  async delete(careerId: number, campusId: number): Promise<void> {
    await this.prisma.careerCampus.delete({
      where: {
        careerId_campusId: {
          careerId,
          campusId,
        },
      },
    });
  }
}