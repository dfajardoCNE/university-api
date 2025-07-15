import { Section } from '../../entities/section.entity';
import { SectionRepository } from '../../repositories/section.repository';

export class GetSectionsByProfessorUseCase {
  constructor(private sectionRepository: SectionRepository) {}

  async execute(professorId: number): Promise<Section[]> {
    return this.sectionRepository.findByProfessor(professorId);
  }
}