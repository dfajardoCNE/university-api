import { Professor } from '../entities/professor.entity';

export interface ProfessorRepository {
  findAll(): Promise<Professor[]>;
  findById(id: number): Promise<Professor>;
  findByPerson(personId: number): Promise<Professor>;
  create(professor: Partial<Professor>): Promise<Professor>;
  update(id: number, professor: Partial<Professor>): Promise<Professor>;
  delete(id: number): Promise<void>;
  count(): Promise<number>;
}