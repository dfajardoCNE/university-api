import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Department } from '../../../../domain/entities/department.entity';
import { DepartmentRepository } from '../../../../domain/repositories/department.repository';

@Injectable()
export class DepartmentRepositoryImpl implements DepartmentRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Department[]> {
    return this.prisma.department.findMany({
      where: { deletedAt: null },
    });
  }

  async findById(id: number): Promise<Department> {
    return this.prisma.department.findUnique({
      where: { id },
    });
  }

  async findByFaculty(facultyId: number): Promise<Department[]> {
    return this.prisma.department.findMany({
      where: { 
        facultyId,
        deletedAt: null 
      },
    });
  }

  async create(department: Partial<Department>): Promise<Department> {
    return this.prisma.department.create({
      data: department,
    });
  }

  async update(id: number, department: Partial<Department>): Promise<Department> {
    return this.prisma.department.update({
      where: { id },
      data: department,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.department.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}