import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Student } from '../../../../domain/entities/student.entity';
import { StudentRepository } from '../../../../domain/repositories/student.repository';

@Injectable()
export class PrismaStudentRepository implements StudentRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Student[]> {
    return this.prisma.student.findMany({
      include: {
        person: true,
        career: true,
      },
    });
  }

  async findById(id: number): Promise<Student> {
    return this.prisma.student.findUnique({
      where: { id },
      include: {
        person: true,
        career: true,
      },
    });
  }

  async findByPerson(personId: number): Promise<Student> {
    return this.prisma.student.findFirst({
      where: { personId },
      include: {
        person: true,
        career: true,
      },
    });
  }

  async findByCareer(careerId: number): Promise<Student[]> {
    return this.prisma.student.findMany({
      where: { careerId },
      include: {
        person: true,
      },
    });
  }

  async findByCampus(campusId: number): Promise<Student[]> {
    return this.prisma.student.findMany({
      where: {
        career: {
          careerCampus: {
            some: {
              campusId,
            },
          },
        },
      },
      include: {
        person: true,
        career: true,
      },
    });
  }

  async create(student: Partial<Student>): Promise<Student> {
    return this.prisma.student.create({
      data: student as any,
      include: {
        person: true,
        career: true,
      },
    });
  }

  async update(id: number, student: Partial<Student>): Promise<Student> {
    return this.prisma.student.update({
      where: { id },
      data: student,
      include: {
        person: true,
        career: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.student.delete({
      where: { id },
    });
  }

  // Métodos para estado académico
  async updateAcademicStatus(id: number, status: string, gpa: number): Promise<void> {
    await this.prisma.student.update({
      where: { id },
      data: {
        academicStatus: status,
        gpa,
        updatedAt: new Date(),
      },
    });
  }

  async findByAcademicStatus(status: string): Promise<Student[]> {
    return this.prisma.student.findMany({
      where: { academicStatus: status },
      include: {
        person: true,
        career: true,
      },
    });
  }

  async getAcademicHistory(id: number): Promise<any> {
    // Obtener todas las secciones completadas por el estudiante
    const studentSections = await this.prisma.studentSection.findMany({
      where: {
        studentId: id,
        finalGrade: { not: null },
      },
      include: {
        section: {
          include: {
            course: true,
            term: true,
          },
        },
      },
      orderBy: {
        section: {
          term: {
            startDate: 'asc',
          },
        },
      },
    });

    // Organizar por término académico
    const history = {};
    
    for (const enrollment of studentSections) {
      const termId = enrollment.section.termId;
      const termName = enrollment.section.term.name;
      
      if (!history[termId]) {
        history[termId] = {
          termId,
          termName,
          startDate: enrollment.section.term.startDate,
          endDate: enrollment.section.term.endDate,
          courses: [],
          termGpa: 0,
          totalCredits: 0,
        };
      }
      
      history[termId].courses.push({
        courseId: enrollment.section.courseId,
        courseCode: enrollment.section.course.code,
        courseName: enrollment.section.course.name,
        credits: enrollment.section.course.credits,
        grade: enrollment.finalGrade,
        status: enrollment.finalGrade >= 3.0 ? 'passed' : 'failed', // Asumiendo 3.0 como nota mínima
      });
    }
    
    // Calcular GPA por término
    for (const termId in history) {
      let totalPoints = 0;
      let totalCredits = 0;
      
      for (const course of history[termId].courses) {
        totalPoints += course.grade * course.credits;
        totalCredits += course.credits;
      }
      
      history[termId].termGpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
      history[termId].totalCredits = totalCredits;
    }
    
    return Object.values(history);
  }

  async count(): Promise<number> {
    return this.prisma.student.count();
  }
}