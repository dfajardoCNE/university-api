import { Enrollment } from '../entities/enrollment.entity';

export interface EnrollmentRepository {
  findAll(): Promise<Enrollment[]>;
  findById(id: number): Promise<Enrollment>;
  findByStudent(studentId: number): Promise<Enrollment[]>;
  findBySection(sectionId: number): Promise<Enrollment[]>;
  create(enrollment: Partial<Enrollment>): Promise<Enrollment>;
  update(id: number, enrollment: Partial<Enrollment>): Promise<Enrollment>;
  updateGrade(id: number, grade: number): Promise<Enrollment>;
  delete(id: number): Promise<void>;
}