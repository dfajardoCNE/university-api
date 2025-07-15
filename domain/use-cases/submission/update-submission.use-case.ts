import { Submission } from '../../entities/submission.entity';
import { SubmissionRepository } from '../../repositories/submission.repository';

export class UpdateSubmissionUseCase {
  constructor(private submissionRepository: SubmissionRepository) {}

  async execute(id: number, submission: Partial<Submission>): Promise<Submission> {
    return this.submissionRepository.update(id, submission);
  }
}