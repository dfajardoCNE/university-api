import { Assignment } from '../entities/assignment.entity';

export interface AssignmentRepository {
  findAll(): Promise<Assignment[]>;
  findById(id: number): Promise<Assignment>;
  findByCourse(courseId: number): Promise<Assignment[]>;
  findByProfessor(professorId: number): Promise<Assignment[]>;
  create(assignment: Partial<Assignment>): Promise<Assignment>;
  update(id: number, assignment: Partial<Assignment>): Promise<Assignment>;
  delete(id: number): Promise<void>;
  findUpcomingBySection(sectionId: number): Promise<any[]>;
}