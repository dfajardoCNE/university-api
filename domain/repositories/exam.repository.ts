import { Exam } from '../entities/exam.entity';

export interface ExamRepository {
  findAll(): Promise<Exam[]>;
  findById(id: number): Promise<Exam>;
  findByCourse(courseId: number): Promise<Exam[]>;
  findByProfessor(professorId: number): Promise<Exam[]>;
  create(exam: Partial<Exam>): Promise<Exam>;
  update(id: number, exam: Partial<Exam>): Promise<Exam>;
  delete(id: number): Promise<void>;
  findUpcomingBySection(sectionId: number): Promise<any[]>;
}