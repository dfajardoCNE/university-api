import { Enrollment } from '../../entities/enrollment.entity';
import { EnrollmentRepository } from '../../repositories/enrollment.repository';

export class GetEnrollmentByIdUseCase {
  constructor(private enrollmentRepository: EnrollmentRepository) {}

  async execute(id: number): Promise<Enrollment> {
    return this.enrollmentRepository.findById(id);
  }
}