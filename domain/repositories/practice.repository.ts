import { Practice } from '../entities/practice.entity';

export interface PracticeRepository {
  findAll(): Promise<Practice[]>;
  findById(id: number): Promise<Practice>;
  findByCourse(courseId: number): Promise<Practice[]>;
  findByProfessor(professorId: number): Promise<Practice[]>;
  create(practice: Partial<Practice>): Promise<Practice>;
  update(id: number, practice: Partial<Practice>): Promise<Practice>;
  delete(id: number): Promise<void>;
}