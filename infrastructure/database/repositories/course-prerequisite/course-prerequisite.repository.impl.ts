import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CoursePrerequisite } from '../../../../domain/entities/course-prerequisite.entity';
import { CoursePrerequisiteRepository } from '../../../../domain/repositories/course-prerequisite.repository';

@Injectable()
export class CoursePrerequisiteRepositoryImpl implements CoursePrerequisiteRepository {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<CoursePrerequisite[]> {
    return this.prisma.coursePrerequisite.findMany({
      include: {
        course: true,
        prerequisite: true,
      },
    });
  }

  async findById(id: number): Promise<CoursePrerequisite> {
    // Usamos una convención: id es un número compuesto como courseId * 1000 + prerequisiteId
    const courseId = Math.floor(id / 1000);
    const prerequisiteId = id % 1000;

    return this.prisma.coursePrerequisite.findUnique({
      where: {
        courseId_prerequisiteId: {
          courseId,
          prerequisiteId,
        },
      },
      include: {
        course: true,
        prerequisite: true,
      },
    });
  }

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

  async findCoursesWithPrerequisite(prerequisiteId: number): Promise<CoursePrerequisite[]> {
    return this.prisma.coursePrerequisite.findMany({
      where: { prerequisiteId },
      include: {
        course: true,
      },
    });
  }

  async create(coursePrerequisite: Partial<CoursePrerequisite>): Promise<CoursePrerequisite> {
    return this.prisma.coursePrerequisite.create({
      data: coursePrerequisite as any,
      include: {
        course: true,
        prerequisite: true,
      },
    });
  }

  async update(id: number, coursePrerequisite: Partial<CoursePrerequisite>): Promise<CoursePrerequisite> {
    // Usamos una convención: id es un número compuesto como courseId * 1000 + prerequisiteId
    const courseId = Math.floor(id / 1000);
    const prerequisiteId = id % 1000;

    return this.prisma.coursePrerequisite.update({
      where: {
        courseId_prerequisiteId: {
          courseId,
          prerequisiteId,
        },
      },
      data: coursePrerequisite as any,
      include: {
        course: true,
        prerequisite: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    // Usamos una convención: id es un número compuesto como courseId * 1000 + prerequisiteId
    const courseId = Math.floor(id / 1000);
    const prerequisiteId = id % 1000;

    await this.prisma.coursePrerequisite.delete({
      where: {
        courseId_prerequisiteId: {
          courseId,
          prerequisiteId,
        },
      },
    });
  }

  async findCourseById(courseId: number): Promise<any> {
    return this.prisma.course.findUnique({
      where: { id: courseId },
    });
  }
}
