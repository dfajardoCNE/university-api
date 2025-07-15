import { Exam } from '../../entities/exam.entity';
import { ExamRepository } from '../../repositories/exam.repository';

export class UpdateExamUseCase {
  constructor(private examRepository: ExamRepository) {}

  async execute(id: number, exam: Partial<Exam>): Promise<Exam> {
    return this.examRepository.update(id, exam);
  }
}