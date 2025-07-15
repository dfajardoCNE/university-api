import { AssignmentRepository } from '../../repositories/assignment.repository';

export class DeleteAssignmentUseCase {
  constructor(private assignmentRepository: AssignmentRepository) {}

  async execute(id: number): Promise<void> {
    return this.assignmentRepository.delete(id);
  }
}