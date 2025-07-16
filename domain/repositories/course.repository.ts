import { Course } from '../entities/course.entity';

export interface CourseRepository {
  findAll(): Promise<Course[]>;
  findById(id: number): Promise<Course>;
  findByCareer(careerId: number): Promise<Course[]>;
  findByCode(code: string): Promise<Course>;
  create(course: Partial<Course>): Promise<Course>;
  update(id: number, course: Partial<Course>): Promise<Course>;
  delete(id: number): Promise<void>;
  count(): Promise<number>;
}