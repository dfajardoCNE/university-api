import { Professor } from '../../entities/professor.entity';
import { ProfessorRepository } from '../../repositories/professor.repository';

export class GetAllProfessorsUseCase {
  constructor(private professorRepository: ProfessorRepository) {}

  async execute(): Promise<Professor[]> {
    return this.professorRepository.findAll();
  }
}