import { Exam } from '../../entities/exam.entity';
import { ExamRepository } from '../../repositories/exam.repository';

export class GetExamByIdUseCase {
  constructor(private examRepository: ExamRepository) {}

  async execute(id: number): Promise<Exam> {
    return this.examRepository.findById(id);
  }
}