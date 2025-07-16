import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StudentSection } from '../../../../domain/entities/student-section.entity';
import { StudentSectionRepository } from '../../../../domain/repositories/student-section.repository';

@Injectable()
export class StudentSectionRepositoryImpl implements StudentSectionRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<StudentSection[]> {
    return this.prisma.studentSection.findMany();
  }

  async findById(id: number): Promise<StudentSection> {
    return this.prisma.studentSection.findUnique({ where: { id } });
  }

  async findByStudent(studentId: number): Promise<StudentSection[]> {
    return this.prisma.studentSection.findMany({ where: { studentId } });
  }

  async findBySection(sectionId: number): Promise<StudentSection[]> {
    return this.prisma.studentSection.findMany({ where: { sectionId } });
  }

  async create(studentSection: Partial<StudentSection>): Promise<StudentSection> {
    const { id, ...data } = studentSection;
    return this.prisma.studentSection.create({ data: data as any });
  }

  async update(id: number, studentSection: Partial<StudentSection>): Promise<StudentSection> {
    const { id: _, ...data } = studentSection;
    return this.prisma.studentSection.update({ where: { id }, data: data as any });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.studentSection.delete({ where: { id } });
  }
}