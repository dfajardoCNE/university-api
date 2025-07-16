import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CoursePrerequisite } from '../../../../domain/entities/course-prerequisite.entity';
import { CoursePrerequisiteRepository } from '../../../../domain/repositories/course-prerequisite.repository';

@Injectable()
export class PrismaCoursePrerequisiteRepository implements CoursePrerequisiteRepository {
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
    // Como CoursePrerequisite usa una clave compuesta, necesitamos una estrategia para
    // convertir un único ID en los dos IDs que necesitamos
    
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
      where: { courseId },
      include: {
        prerequisite: true,
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
    // En este caso, id no es un campo único en CoursePrerequisite
    // Asumimos que id es un identificador compuesto y extraemos courseId y prerequisiteId
    const { courseId, prerequisiteId } = coursePrerequisite;

    return this.prisma.coursePrerequisite.update({
      where: {
        courseId_prerequisiteId: {
          courseId: courseId || 0,
          prerequisiteId: prerequisiteId || 0,
        },
      },
      data: coursePrerequisite,
      include: {
        course: true,
        prerequisite: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    // En este caso, id no es un campo único en CoursePrerequisite
    // Esta implementación es un placeholder, en la práctica necesitaríamos courseId y prerequisiteId
    // Para una implementación real, este método debería recibir ambos IDs
    console.warn('delete method called with id only, this is not supported for CoursePrerequisite');
  }

  async findCourseById(courseId: number): Promise<any> {
    return this.prisma.course.findUnique({
      where: { id: courseId },
    });
  }
}