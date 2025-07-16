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
}
