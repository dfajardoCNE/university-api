import { Enrollment } from '../../entities/enrollment.entity';
import { EnrollmentRepository } from '../../repositories/enrollment.repository';

export class CreateEnrollmentUseCase {
  constructor(private enrollmentRepository: EnrollmentRepository) {}

  async execute(enrollment: Partial<Enrollment>): Promise<Enrollment> {
    return this.enrollmentRepository.create(enrollment);
  }
}