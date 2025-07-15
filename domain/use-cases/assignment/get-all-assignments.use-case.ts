import { Assignment } from '../../entities/assignment.entity';
import { AssignmentRepository } from '../../repositories/assignment.repository';

export class GetAllAssignmentsUseCase {
  constructor(private assignmentRepository: AssignmentRepository) {}

  async execute(): Promise<Assignment[]> {
    return this.assignmentRepository.findAll();
  }
}