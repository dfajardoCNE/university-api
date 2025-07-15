import { University } from '../entities/university.entity';

export interface UniversityRepository {
  findAll(): Promise<University[]>;
  findById(id: number): Promise<University>;
  create(university: Partial<University>): Promise<University>;
  update(id: number, university: Partial<University>): Promise<University>;
  delete(id: number): Promise<void>;
}