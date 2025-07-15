import { CoursePrerequisite } from '../entities/course-prerequisite.entity';

export interface CoursePrerequisiteRepository {
  findByCourse(courseId: number): Promise<CoursePrerequisite[]>;
  findPrerequisitesForCourse(courseId: number): Promise<CoursePrerequisite[]>;
  create(coursePrerequisite: CoursePrerequisite): Promise<CoursePrerequisite>;
  delete(courseId: number, prerequisiteId: number): Promise<void>;
}