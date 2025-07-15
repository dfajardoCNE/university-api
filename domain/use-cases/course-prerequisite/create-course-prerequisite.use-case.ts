import { CoursePrerequisite } from '../../entities/course-prerequisite.entity';
import { CoursePrerequisiteRepository } from '../../repositories/course-prerequisite.repository';

export class CreateCoursePrerequisiteUseCase {
  constructor(private coursePrerequisiteRepository: CoursePrerequisiteRepository) {}

  async execute(coursePrerequisite: CoursePrerequisite): Promise<CoursePrerequisite> {
    return this.coursePrerequisiteRepository.create(coursePrerequisite);
  }
}