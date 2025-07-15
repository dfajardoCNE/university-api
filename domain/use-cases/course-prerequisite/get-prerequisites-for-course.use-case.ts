import { CoursePrerequisite } from '../../entities/course-prerequisite.entity';
import { CoursePrerequisiteRepository } from '../../repositories/course-prerequisite.repository';

export class GetPrerequisitesForCourseUseCase {
  constructor(private coursePrerequisiteRepository: CoursePrerequisiteRepository) {}

  async execute(courseId: number): Promise<CoursePrerequisite[]> {
    return this.coursePrerequisiteRepository.findPrerequisitesForCourse(courseId);
  }
}