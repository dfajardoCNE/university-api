import { Course } from '../../entities/course.entity';
import { CourseRepository } from '../../repositories/course.repository';

export class UpdateCourseUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute(id: number, course: Partial<Course>): Promise<Course> {
    return this.courseRepository.update(id, course);
  }
}