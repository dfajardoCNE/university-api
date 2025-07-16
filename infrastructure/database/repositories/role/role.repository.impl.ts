import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '../../../../domain/entities/role.entity';
import { RoleRepository } from '../../../../domain/repositories/role.repository';

@Injectable()
export class RoleRepositoryImpl implements RoleRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  async findById(id: number): Promise<Role> {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<Role> {
    return this.prisma.role.findUnique({
      where: { name },
    });
  }

  async create(role: Partial<Role>): Promise<Role> {
    const { id, ...data } = role;
    return this.prisma.role.create({ data: data as any });
  }

  async update(id: number, role: Partial<Role>): Promise<Role> {
    const { id: _, ...data } = role;
    return this.prisma.role.update({ where: { id }, data: data as any });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.role.delete({ where: { id } });
  }
}
