import { Enrollment } from '../../entities/enrollment.entity';
import { EnrollmentRepository } from '../../repositories/enrollment.repository';

export class UpdateEnrollmentUseCase {
  constructor(private enrollmentRepository: EnrollmentRepository) {}

  async execute(id: number, enrollment: Partial<Enrollment>): Promise<Enrollment> {
    return this.enrollmentRepository.update(id, enrollment);
  }
}