import { CoursePrerequisite } from '../../entities/course-prerequisite.entity';
import { CoursePrerequisiteRepository } from '../../repositories/course-prerequisite.repository';

export class GetCoursesByPrerequisiteUseCase {
  constructor(private coursePrerequisiteRepository: CoursePrerequisiteRepository) {}

  async execute(prerequisiteId: number): Promise<CoursePrerequisite[]> {
    return this.coursePrerequisiteRepository.findByCourse(prerequisiteId);
  }
}