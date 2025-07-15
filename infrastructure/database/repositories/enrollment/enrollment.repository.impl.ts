import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Enrollment } from '../../../../domain/entities/enrollment.entity';
import { EnrollmentRepository } from '../../../../domain/repositories/enrollment.repository';

@Injectable()
export class EnrollmentRepositoryImpl implements EnrollmentRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      include: {
        student: {
          include: {
            person: true,
          },
        },
        section: {
          include: {
            course: true,
            professor: {
              include: {
                person: true,
              },
            },
          },
        },
      },
    });
  }

  async findById(id: number): Promise<Enrollment> {
    return this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            person: true,
          },
        },
        section: {
          include: {
            course: true,
            professor: {
              include: {
                person: true,
              },
            },
          },
        },
      },
    });
  }

  async findByStudent(studentId: number): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      where: { studentId },
      include: {
        student: {
          include: {
            person: true,
          },
        },
        section: {
          include: {
            course: true,
            professor: {
              include: {
                person: true,
              },
            },
          },
        },
      },
    });
  }

  async findBySection(sectionId: number): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      where: { sectionId },
      include: {
        student: {
          include: {
            person: true,
          },
        },
        section: {
          include: {
            course: true,
            professor: {
              include: {
                person: true,
              },
            },
          },
        },
      },
    });
  }

  async create(enrollment: Partial<Enrollment>): Promise<Enrollment> {
    // Incrementar el contador de inscritos en la sección
    await this.prisma.section.update({
      where: { id: enrollment.sectionId },
      data: {
        enrolledCount: {
          increment: 1,
        },
      },
    });

    return this.prisma.enrollment.create({
      data: enrollment,
      include: {
        student: {
          include: {
            person: true,
          },
        },
        section: {
          include: {
            course: true,
            professor: {
              include: {
                person: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: number, enrollment: Partial<Enrollment>): Promise<Enrollment> {
    return this.prisma.enrollment.update({
      where: { id },
      data: enrollment,
      include: {
        student: {
          include: {
            person: true,
          },
        },
        section: {
          include: {
            course: true,
            professor: {
              include: {
                person: true,
              },
            },
          },
        },
      },
    });
  }

  async updateGrade(id: number, grade: number): Promise<Enrollment> {
    return this.prisma.enrollment.update({
      where: { id },
      data: { grade },
      include: {
        student: {
          include: {
            person: true,
          },
        },
        section: {
          include: {
            course: true,
            professor: {
              include: {
                person: true,
              },
            },
          },
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    // Obtener la matrícula para conocer la sección
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
    });

    // Decrementar el contador de inscritos en la sección
    await this.prisma.section.update({
      where: { id: enrollment.sectionId },
      data: {
        enrolledCount: {
          decrement: 1,
        },
      },
    });

    await this.prisma.enrollment.delete({
      where: { id },
    });
  }
}