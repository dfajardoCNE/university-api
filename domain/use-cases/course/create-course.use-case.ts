import { Course } from '../../entities/course.entity';
import { CourseRepository } from '../../repositories/course.repository';

export class CreateCourseUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute(course: Partial<Course>): Promise<Course> {
    return this.courseRepository.create(course);
  }
}