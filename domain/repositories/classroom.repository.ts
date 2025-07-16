import { Classroom } from '../entities/classroom.entity';

export interface ClassroomRepository {
  findAll(): Promise<Classroom[]>;
  findById(id: number): Promise<Classroom>;
  findByCampus(campusId: number): Promise<Classroom[]>;
  create(classroom: Partial<Classroom>): Promise<Classroom>;
  update(id: number, classroom: Partial<Classroom>): Promise<Classroom>;
  delete(id: number): Promise<void>;
}