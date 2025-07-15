import { Course } from '../../entities/course.entity';
import { CourseRepository } from '../../repositories/course.repository';

export class GetAllCoursesUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute(): Promise<Course[]> {
    return this.courseRepository.findAll();
  }
}