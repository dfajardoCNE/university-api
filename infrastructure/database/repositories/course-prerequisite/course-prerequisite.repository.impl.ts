import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CoursePrerequisite } from '../../../../domain/entities/course-prerequisite.entity';
import { CoursePrerequisiteRepository } from '../../../../domain/repositories/course-prerequisite.repository';

@Injectable()
export class CoursePrerequisiteRepositoryImpl implements CoursePrerequisiteRepository {
  constructor(private prisma: PrismaService) {}

  async findByCourse(courseId: number): Promise<CoursePrerequisite[]> {
    return this.prisma.coursePrerequisite.findMany({
      where: { prerequisiteId: courseId },
      include: {
        course: true,
      },
    });
  }

  async findPrerequisitesForCourse(courseId: number): Promise<CoursePrerequisite[]> {
    return this.prisma.coursePrerequisite.findMany({
      where: { courseId },
      include: {
        prerequisite: true,
      },
    });
  }

  async create(coursePrerequisite: CoursePrerequisite): Promise<CoursePrerequisite> {
    return this.prisma.coursePrerequisite.create({
      data: coursePrerequisite,
      include: {
        course: true,
        prerequisite: true,
      },
    });
  }

  async delete(courseId: number, prerequisiteId: number): Promise<void> {
    await this.prisma.coursePrerequisite.delete({
      where: {
        courseId_prerequisiteId: {
          courseId,
          prerequisiteId,
        },
      },
    });
  }
}
