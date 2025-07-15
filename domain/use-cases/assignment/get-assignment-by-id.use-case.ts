import { Assignment } from '../../entities/assignment.entity';
import { AssignmentRepository } from '../../repositories/assignment.repository';

export class GetAssignmentByIdUseCase {
  constructor(private assignmentRepository: AssignmentRepository) {}

  async execute(id: number): Promise<Assignment> {
    return this.assignmentRepository.findById(id);
  }
}