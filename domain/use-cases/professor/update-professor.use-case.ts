import { Professor } from '../../entities/professor.entity';
import { ProfessorRepository } from '../../repositories/professor.repository';

export class UpdateProfessorUseCase {
  constructor(private professorRepository: ProfessorRepository) {}

  async execute(id: number, professor: Partial<Professor>): Promise<Professor> {
    return this.professorRepository.update(id, professor);
  }
}