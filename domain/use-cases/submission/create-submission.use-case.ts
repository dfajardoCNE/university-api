import { Submission } from '../../entities/submission.entity';
import { SubmissionRepository } from '../../repositories/submission.repository';

export class CreateSubmissionUseCase {
  constructor(private submissionRepository: SubmissionRepository) {}

  async execute(submission: Partial<Submission>): Promise<Submission> {
    return this.submissionRepository.create(submission);
  }
}