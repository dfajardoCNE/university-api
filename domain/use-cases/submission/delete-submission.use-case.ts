import { SubmissionRepository } from '../../repositories/submission.repository';

export class DeleteSubmissionUseCase {
  constructor(private submissionRepository: SubmissionRepository) {}

  async execute(id: number): Promise<void> {
    return this.submissionRepository.delete(id);
  }
}