import { EnrollmentRepository } from '../../repositories/enrollment.repository';

export class DeleteEnrollmentUseCase {
  constructor(private enrollmentRepository: EnrollmentRepository) {}

  async execute(id: number): Promise<void> {
    return this.enrollmentRepository.delete(id);
  }
}