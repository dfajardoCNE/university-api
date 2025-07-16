import { StudentSection } from '../entities/student-section.entity';

export interface StudentSectionRepository {
  findAll(): Promise<StudentSection[]>;
  findById(id: number): Promise<StudentSection>;
  findByStudent(studentId: number): Promise<StudentSection[]>;
  findBySection(sectionId: number): Promise<StudentSection[]>;
  create(studentSection: Partial<StudentSection>): Promise<StudentSection>;
  update(id: number, studentSection: Partial<StudentSection>): Promise<StudentSection>;
  delete(id: number): Promise<void>;
  findByStudentAndSection(studentId: number, sectionId: number): Promise<StudentSection>;
  countBySection(sectionId: number): Promise<number>;
  findPassedSectionsByStudent(studentId: number): Promise<any[]>;
  findCompletedSectionsByStudent(studentId: number, termId?: number): Promise<any[]>;
  findCurrentSectionsByStudent(studentId: number): Promise<any[]>;
}