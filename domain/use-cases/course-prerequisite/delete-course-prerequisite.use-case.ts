import { CoursePrerequisiteRepository } from '../../repositories/course-prerequisite.repository';

export class DeleteCoursePrerequisiteUseCase {
  constructor(private coursePrerequisiteRepository: CoursePrerequisiteRepository) {}

  async execute(courseId: number, prerequisiteId: number): Promise<void> {
    // Usamos una convención: id es un número compuesto como courseId * 1000 + prerequisiteId
    const compositeId = courseId * 1000 + prerequisiteId;
    return this.coursePrerequisiteRepository.delete(compositeId);
  }
}