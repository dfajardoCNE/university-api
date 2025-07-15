import { Exam } from '../../entities/exam.entity';
import { ExamRepository } from '../../repositories/exam.repository';

export class GetExamsByCourseUseCase {
  constructor(private examRepository: ExamRepository) {}

  async execute(courseId: number): Promise<Exam[]> {
    return this.examRepository.findByCourse(courseId);
  }
}