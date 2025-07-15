import { Course } from '../../entities/course.entity';
import { CourseRepository } from '../../repositories/course.repository';

export class GetCourseByIdUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute(id: number): Promise<Course> {
    return this.courseRepository.findById(id);
  }
}