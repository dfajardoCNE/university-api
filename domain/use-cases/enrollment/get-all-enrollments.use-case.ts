import { Enrollment } from '../../entities/enrollment.entity';
import { EnrollmentRepository } from '../../repositories/enrollment.repository';

export class GetAllEnrollmentsUseCase {
  constructor(private enrollmentRepository: EnrollmentRepository) {}

  async execute(): Promise<Enrollment[]> {
    return this.enrollmentRepository.findAll();
  }
}