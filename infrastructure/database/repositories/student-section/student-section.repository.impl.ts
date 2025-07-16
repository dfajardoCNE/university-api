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

  async findByStudentAndSection(studentId: number, sectionId: number): Promise<StudentSection> {
    return this.prisma.studentSection.findFirst({
      where: {
        studentId,
        sectionId
      }
    });
  }

  async countBySection(sectionId: number): Promise<number> {
    return this.prisma.studentSection.count({
      where: { sectionId }
    });
  }

  async findPassedSectionsByStudent(studentId: number): Promise<any[]> {
    return this.prisma.studentSection.findMany({
      where: {
        studentId,
        finalGrade: {
          gte: 3.0 // Asumiendo 3.0 como nota mínima de aprobación
        },
        status: 'completed'
      },
      include: {
        section: {
          include: {
            course: true
          }
        }
      }
    });
  }

  async findCompletedSectionsByStudent(studentId: number, termId?: number): Promise<any[]> {
    const whereClause: any = {
      studentId,
      finalGrade: { not: null },
      status: 'completed'
    };

    if (termId) {
      whereClause.section = {
        termId
      };
    }

    return this.prisma.studentSection.findMany({
      where: whereClause,
      include: {
        section: {
          include: {
            course: true
          }
        }
      }
    });
  }

  async findCurrentSectionsByStudent(studentId: number): Promise<any[]> {
    const currentDate = new Date();

    return this.prisma.studentSection.findMany({
      where: {
        studentId,
        status: 'active',
        section: {
          term: {
            startDate: { lte: currentDate },
            endDate: { gte: currentDate }
          }
        }
      },
      include: {
        section: {
          include: {
            course: true,
            professor: {
              include: {
                person: true
              }
            },
            sessionTime: true
          }
        }
      }
    });
  }
}