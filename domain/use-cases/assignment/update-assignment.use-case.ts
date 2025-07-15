import { Assignment } from '../../entities/assignment.entity';
import { AssignmentRepository } from '../../repositories/assignment.repository';

export class UpdateAssignmentUseCase {
  constructor(private assignmentRepository: AssignmentRepository) {}

  async execute(id: number, assignment: Partial<Assignment>): Promise<Assignment> {
    return this.assignmentRepository.update(id, assignment);
  }
}