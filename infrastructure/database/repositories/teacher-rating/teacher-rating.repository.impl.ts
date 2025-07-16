import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TeacherRating } from '../../../../domain/entities/teacher-rating.entity';
import { TeacherRatingRepository } from '../../../../domain/repositories/teacher-rating.repository';

@Injectable()
export class TeacherRatingRepositoryImpl implements TeacherRatingRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<TeacherRating[]> {
    return this.prisma.teacherRating.findMany({
      include: {
        student: {
          include: {
            person: true,
          },
        },
        professor: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async findById(id: number): Promise<TeacherRating> {
    return this.prisma.teacherRating.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            person: true,
          },
        },
        professor: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async findByProfessor(professorId: number): Promise<TeacherRating[]> {
    return this.prisma.teacherRating.findMany({
      where: { professorId },
      include: {
        student: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async findByStudent(studentId: number): Promise<TeacherRating[]> {
    return this.prisma.teacherRating.findMany({
      where: { studentId },
      include: {
        professor: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async create(rating: Partial<TeacherRating>): Promise<TeacherRating> {
    const { id, ...data } = rating;
    return this.prisma.teacherRating.create({
      data: data as any,
      include: {
        student: {
          include: {
            person: true,
          },
        },
        professor: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async update(id: number, rating: Partial<TeacherRating>): Promise<TeacherRating> {
    const { id: _, ...data } = rating;
    return this.prisma.teacherRating.update({
      where: { id },
      data: data as any,
      include: {
        student: {
          include: {
            person: true,
          },
        },
        professor: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.teacherRating.delete({
      where: { id },
    });
  }
}
