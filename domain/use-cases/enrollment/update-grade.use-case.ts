import { Enrollment } from '../../entities/enrollment.entity';
import { EnrollmentRepository } from '../../repositories/enrollment.repository';

export class UpdateGradeUseCase {
  constructor(private enrollmentRepository: EnrollmentRepository) {}

  async execute(id: number, grade: number): Promise<Enrollment> {
    return this.enrollmentRepository.updateGrade(id, grade);
  }
}