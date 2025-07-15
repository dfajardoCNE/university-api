import { Submission } from '../../entities/submission.entity';
import { SubmissionRepository } from '../../repositories/submission.repository';

export class GetSubmissionByIdUseCase {
  constructor(private submissionRepository: SubmissionRepository) {}

  async execute(id: number): Promise<Submission> {
    return this.submissionRepository.findById(id);
  }
}