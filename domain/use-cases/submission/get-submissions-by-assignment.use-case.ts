import { Submission } from '../../entities/submission.entity';
import { SubmissionRepository } from '../../repositories/submission.repository';

export class GetSubmissionsByAssignmentUseCase {
  constructor(private submissionRepository: SubmissionRepository) {}

  async execute(assignmentId: number): Promise<Submission[]> {
    return this.submissionRepository.findByAssignment(assignmentId);
  }
}