import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Campus } from '../../../../domain/entities/campus.entity';
import { CampusRepository } from '../../../../domain/repositories/campus.repository';

@Injectable()
export class CampusRepositoryImpl implements CampusRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Campus[]> {
    return this.prisma.campus.findMany();
  }

  async findById(id: number): Promise<Campus> {
    return this.prisma.campus.findUnique({
      where: { id },
    });
  }

  async create(campus: Partial<Campus>): Promise<Campus> {
    const { id, ...data } = campus;
    return this.prisma.campus.create({
      data: data as any,
    });
  }

  async update(id: number, campus: Partial<Campus>): Promise<Campus> {
    const { id: _, ...data } = campus;
    return this.prisma.campus.update({
      where: { id },
      data: data as any,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.campus.delete({
      where: { id },
    });
  }
}
