import { TeacherRating } from '../entities/teacher-rating.entity';

export interface TeacherRatingRepository {
  findAll(): Promise<TeacherRating[]>;
  findById(id: number): Promise<TeacherRating>;
  findByProfessor(professorId: number): Promise<TeacherRating[]>;
  findByStudent(studentId: number): Promise<TeacherRating[]>;
  create(rating: Partial<TeacherRating>): Promise<TeacherRating>;
  update(id: number, rating: Partial<TeacherRating>): Promise<TeacherRating>;
  delete(id: number): Promise<void>;
}