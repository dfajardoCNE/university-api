import { Course } from '../../entities/course.entity';
import { CourseRepository } from '../../repositories/course.repository';

export class GetCoursesByCareerUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute(careerId: number): Promise<Course[]> {
    return this.courseRepository.findByCareer(careerId);
  }
}