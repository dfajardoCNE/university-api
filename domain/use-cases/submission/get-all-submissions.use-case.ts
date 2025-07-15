import { Submission } from '../../entities/submission.entity';
import { SubmissionRepository } from '../../repositories/submission.repository';

export class GetAllSubmissionsUseCase {
  constructor(private submissionRepository: SubmissionRepository) {}

  async execute(): Promise<Submission[]> {
    return this.submissionRepository.findAll();
  }
}