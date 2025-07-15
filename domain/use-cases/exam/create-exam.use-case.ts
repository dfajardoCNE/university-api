import { Exam } from '../../entities/exam.entity';
import { ExamRepository } from '../../repositories/exam.repository';

export class CreateExamUseCase {
  constructor(private examRepository: ExamRepository) {}

  async execute(exam: Partial<Exam>): Promise<Exam> {
    return this.examRepository.create(exam);
  }
}