import { CoursePrerequisiteRepository } from '../../repositories/course-prerequisite.repository';

export class DeleteCoursePrerequisiteUseCase {
  constructor(private coursePrerequisiteRepository: CoursePrerequisiteRepository) {}

  async execute(courseId: number, prerequisiteId: number): Promise<void> {
    return this.coursePrerequisiteRepository.delete(courseId, prerequisiteId);
  }
}