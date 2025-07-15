import { Faculty } from '../entities/faculty.entity';

export interface FacultyRepository {
  findAll(): Promise<Faculty[]>;
  findById(id: number): Promise<Faculty>;
  findByUniversity(universityId: number): Promise<Faculty[]>;
  create(faculty: Partial<Faculty>): Promise<Faculty>;
  update(id: number, faculty: Partial<Faculty>): Promise<Faculty>;
  delete(id: number): Promise<void>;
}