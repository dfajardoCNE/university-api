import { Professor } from '../../entities/professor.entity';
import { ProfessorRepository } from '../../repositories/professor.repository';

export class CreateProfessorUseCase {
  constructor(private professorRepository: ProfessorRepository) {}

  async execute(professor: Partial<Professor>): Promise<Professor> {
    return this.professorRepository.create(professor);
  }
}