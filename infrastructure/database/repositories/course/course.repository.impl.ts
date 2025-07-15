import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Course } from '../../../../domain/entities/course.entity';
import { CourseRepository } from '../../../../domain/repositories/course.repository';

@Injectable()
export class CourseRepositoryImpl implements CourseRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Course[]> {
    return this.prisma.course.findMany();
  }

  async findById(id: number): Promise<Course> {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  async findByCareer(careerId: number): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: { careerId },
    });
  }

  async findByCode(code: string): Promise<Course> {
    return this.prisma.course.findUnique({
      where: { code },
    });
  }

  async create(course: Partial<Course>): Promise<Course> {
    return this.prisma.course.create({
      data: course,
    });
  }

  async update(id: number, course: Partial<Course>): Promise<Course> {
    return this.prisma.course.update({
      where: { id },
      data: course,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.course.delete({
      where: { id },
    });
  }
}