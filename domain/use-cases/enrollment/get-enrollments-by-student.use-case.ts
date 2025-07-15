import { Enrollment } from '../../entities/enrollment.entity';
import { EnrollmentRepository } from '../../repositories/enrollment.repository';

export class GetEnrollmentsByStudentUseCase {
  constructor(private enrollmentRepository: EnrollmentRepository) {}

  async execute(studentId: number): Promise<Enrollment[]> {
    return this.enrollmentRepository.findByStudent(studentId);
  }
}