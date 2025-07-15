import { Exam } from '../../entities/exam.entity';
import { ExamRepository } from '../../repositories/exam.repository';

export class GetExamsByProfessorUseCase {
  constructor(private examRepository: ExamRepository) {}

  async execute(professorId: number): Promise<Exam[]> {
    return this.examRepository.findByProfessor(professorId);
  }
}