import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Submission } from '../../../../domain/entities/submission.entity';
import { SubmissionRepository } from '../../../../domain/repositories/submission.repository';

@Injectable()
export class SubmissionRepositoryImpl implements SubmissionRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Submission[]> {
    return this.prisma.submission.findMany({
      include: {
        student: true,
        exam: true,
        practice: true,
        assignment: true,
      },
    });
  }

  async findById(id: number): Promise<Submission> {
    return this.prisma.submission.findUnique({
      where: { id },
      include: {
        student: true,
        exam: true,
        practice: true,
        assignment: true,
      },
    });
  }

  async findByStudent(studentId: number): Promise<Submission[]> {
    return this.prisma.submission.findMany({
      where: { studentId },
      include: {
        exam: true,
        practice: true,
        assignment: true,
      },
    });
  }

  async findByExam(examId: number): Promise<Submission[]> {
    return this.prisma.submission.findMany({
      where: { examId },
      include: {
        student: true,
      },
    });
  }

  async findByPractice(practiceId: number): Promise<Submission[]> {
    return this.prisma.submission.findMany({
      where: { practiceId },
      include: {
        student: true,
      },
    });
  }

  async findByAssignment(assignmentId: number): Promise<Submission[]> {
    return this.prisma.submission.findMany({
      where: { assignmentId },
      include: {
        student: true,
      },
    });
  }

  async create(submission: Partial<Submission>): Promise<Submission> {
    const { id, ...data } = submission;
    return this.prisma.submission.create({
      data: data as any,
      include: {
        student: true,
        exam: true,
        practice: true,
        assignment: true,
      },
    });
  }

  async update(id: number, submission: Partial<Submission>): Promise<Submission> {
    const { id: _, ...data } = submission;
    return this.prisma.submission.update({
      where: { id },
      data: data as any,
      include: {
        student: true,
        exam: true,
        practice: true,
        assignment: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.submission.delete({
      where: { id },
    });
  }

  async findPendingGradingBySection(sectionId: number): Promise<any[]> {
    // Obtener el curso asociado a la sección
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      select: { courseId: true }
    });
    
    if (!section) {
      return [];
    }
    
    // Buscar entregas sin calificación para asignaciones de este curso
    const assignmentSubmissions = await this.prisma.submission.findMany({
      where: {
        grade: null,
        assignment: {
          courseId: section.courseId
        }
      },
      include: {
        student: {
          include: {
            person: true
          }
        },
        assignment: true
      }
    });
    
    // Buscar entregas sin calificación para exámenes de este curso
    const examSubmissions = await this.prisma.submission.findMany({
      where: {
        grade: null,
        exam: {
          courseId: section.courseId
        }
      },
      include: {
        student: {
          include: {
            person: true
          }
        },
        exam: true
      }
    });
    
    // Buscar entregas sin calificación para prácticas de este curso
    const practiceSubmissions = await this.prisma.submission.findMany({
      where: {
        grade: null,
        practice: {
          courseId: section.courseId
        }
      },
      include: {
        student: {
          include: {
            person: true
          }
        },
        practice: true
      }
    });
    
    // Combinar y formatear los resultados
    const result = [
      ...assignmentSubmissions.map(sub => ({
        id: sub.id,
        studentId: sub.studentId,
        studentName: `${sub.student.person.firstName} ${sub.student.person.lastName}`,
        type: 'assignment',
        title: sub.assignment.title,
        submittedAt: sub.submittedAt
      })),
      ...examSubmissions.map(sub => ({
        id: sub.id,
        studentId: sub.studentId,
        studentName: `${sub.student.person.firstName} ${sub.student.person.lastName}`,
        type: 'exam',
        title: sub.exam.title,
        submittedAt: sub.submittedAt
      })),
      ...practiceSubmissions.map(sub => ({
        id: sub.id,
        studentId: sub.studentId,
        studentName: `${sub.student.person.firstName} ${sub.student.person.lastName}`,
        type: 'practice',
        title: sub.practice.title,
        submittedAt: sub.submittedAt
      }))
    ];
    
    // Ordenar por fecha de entrega
    return result.sort((a, b) => a.submittedAt.getTime() - b.submittedAt.getTime());
  }

  async findPendingGradesByStudentAndSection(studentId: number, sectionId: number): Promise<any[]> {
    // Obtener el curso asociado a la sección
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      select: { courseId: true }
    });
    
    if (!section) {
      return [];
    }
    
    // Buscar entregas del estudiante sin calificación para asignaciones de este curso
    const assignmentSubmissions = await this.prisma.submission.findMany({
      where: {
        studentId,
        grade: null,
        assignment: {
          courseId: section.courseId
        }
      },
      include: {
        assignment: true
      }
    });
    
    // Buscar entregas del estudiante sin calificación para exámenes de este curso
    const examSubmissions = await this.prisma.submission.findMany({
      where: {
        studentId,
        grade: null,
        exam: {
          courseId: section.courseId
        }
      },
      include: {
        exam: true
      }
    });
    
    // Buscar entregas del estudiante sin calificación para prácticas de este curso
    const practiceSubmissions = await this.prisma.submission.findMany({
      where: {
        studentId,
        grade: null,
        practice: {
          courseId: section.courseId
        }
      },
      include: {
        practice: true
      }
    });
    
    // Combinar y formatear los resultados
    const result = [
      ...assignmentSubmissions.map(sub => ({
        id: sub.id,
        type: 'assignment',
        title: sub.assignment.title,
        submittedAt: sub.submittedAt
      })),
      ...examSubmissions.map(sub => ({
        id: sub.id,
        type: 'exam',
        title: sub.exam.title,
        submittedAt: sub.submittedAt
      })),
      ...practiceSubmissions.map(sub => ({
        id: sub.id,
        type: 'practice',
        title: sub.practice.title,
        submittedAt: sub.submittedAt
      }))
    ];
    
    // Ordenar por fecha de entrega
    return result.sort((a, b) => a.submittedAt.getTime() - b.submittedAt.getTime());
  }
}
