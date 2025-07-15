import { Enrollment } from '../../entities/enrollment.entity';
import { EnrollmentRepository } from '../../repositories/enrollment.repository';

export class GetEnrollmentsBySectionUseCase {
  constructor(private enrollmentRepository: EnrollmentRepository) {}

  async execute(sectionId: number): Promise<Enrollment[]> {
    return this.enrollmentRepository.findBySection(sectionId);
  }
}