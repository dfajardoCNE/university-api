import { ExamRepository } from '../../repositories/exam.repository';

export class DeleteExamUseCase {
  constructor(private examRepository: ExamRepository) {}

  async execute(id: number): Promise<void> {
    return this.examRepository.delete(id);
  }
}