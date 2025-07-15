import { Exam } from '../../entities/exam.entity';
import { ExamRepository } from '../../repositories/exam.repository';

export class GetAllExamsUseCase {
  constructor(private examRepository: ExamRepository) {}

  async execute(): Promise<Exam[]> {
    return this.examRepository.findAll();
  }
}