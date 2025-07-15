import { Professor } from '../../entities/professor.entity';
import { ProfessorRepository } from '../../repositories/professor.repository';

export class GetProfessorByIdUseCase {
  constructor(private professorRepository: ProfessorRepository) {}

  async execute(id: number): Promise<Professor> {
    return this.professorRepository.findById(id);
  }
}