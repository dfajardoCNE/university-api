import { CoursePrerequisite } from '../entities/course-prerequisite.entity';

export interface CoursePrerequisiteRepository {
  findAll(): Promise<CoursePrerequisite[]>;
  findById(id: number): Promise<CoursePrerequisite>;
  findByCourse(courseId: number): Promise<CoursePrerequisite[]>;
  findPrerequisitesForCourse(courseId: number): Promise<CoursePrerequisite[]>;
  findCoursesWithPrerequisite(prerequisiteId: number): Promise<CoursePrerequisite[]>;
  create(coursePrerequisite: Partial<CoursePrerequisite>): Promise<CoursePrerequisite>;
  update(id: number, coursePrerequisite: Partial<CoursePrerequisite>): Promise<CoursePrerequisite>;
  delete(id: number): Promise<void>;
  findCourseById(courseId: number): Promise<any>;
}