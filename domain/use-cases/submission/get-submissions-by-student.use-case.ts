import { Submission } from '../../entities/submission.entity';
import { SubmissionRepository } from '../../repositories/submission.repository';

export class GetSubmissionsByStudentUseCase {
  constructor(private submissionRepository: SubmissionRepository) {}

  async execute(studentId: number): Promise<Submission[]> {
    return this.submissionRepository.findByStudent(studentId);
  }
}