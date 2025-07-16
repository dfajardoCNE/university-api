import { Student } from '../entities/student.entity';

export interface StudentRepository {
  findAll(): Promise<Student[]>;
  findById(id: number): Promise<Student>;
  findByPerson(personId: number): Promise<Student>;
  findByCareer(careerId: number): Promise<Student[]>;
  findByCampus(campusId: number): Promise<Student[]>;
  create(student: Partial<Student>): Promise<Student>;
  update(id: number, student: Partial<Student>): Promise<Student>;
  delete(id: number): Promise<void>;
  
  // Academic status methods
  updateAcademicStatus(id: number, status: string, gpa: number): Promise<void>;
  findByAcademicStatus(status: string): Promise<Student[]>;
  getAcademicHistory(id: number): Promise<any>; // Historial académico completo
}