import { ProfessorRepository } from '../../repositories/professor.repository';

export class DeleteProfessorUseCase {
  constructor(private professorRepository: ProfessorRepository) {}

  async execute(id: number): Promise<void> {
    return this.professorRepository.delete(id);
  }
}