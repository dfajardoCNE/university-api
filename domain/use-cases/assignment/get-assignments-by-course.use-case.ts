import { Assignment } from '../../entities/assignment.entity';
import { AssignmentRepository } from '../../repositories/assignment.repository';

export class GetAssignmentsByCourseUseCase {
  constructor(private assignmentRepository: AssignmentRepository) {}

  async execute(courseId: number): Promise<Assignment[]> {
    return this.assignmentRepository.findByCourse(courseId);
  }
}