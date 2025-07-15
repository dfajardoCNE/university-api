import { CourseRepository } from '../../repositories/course.repository';

export class DeleteCourseUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute(id: number): Promise<void> {
    return this.courseRepository.delete(id);
  }
}