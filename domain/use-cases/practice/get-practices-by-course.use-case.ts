import { Practice } from '../../entities/practice.entity';
import { PracticeRepository } from '../../repositories/practice.repository';

export class GetPracticesByCourseUseCase {
  constructor(private practiceRepository: PracticeRepository) {}

  async execute(courseId: number): Promise<Practice[]> {
    return this.practiceRepository.findByCourse(courseId);
  }
}