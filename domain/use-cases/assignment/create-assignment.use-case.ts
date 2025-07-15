import { Assignment } from '../../entities/assignment.entity';
import { AssignmentRepository } from '../../repositories/assignment.repository';

export class CreateAssignmentUseCase {
  constructor(private assignmentRepository: AssignmentRepository) {}

  async execute(assignment: Partial<Assignment>): Promise<Assignment> {
    return this.assignmentRepository.create(assignment);
  }
}