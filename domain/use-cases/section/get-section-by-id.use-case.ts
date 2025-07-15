import { Section } from '../../entities/section.entity';
import { SectionRepository } from '../../repositories/section.repository';

export class GetSectionByIdUseCase {
  constructor(private sectionRepository: SectionRepository) {}

  async execute(id: number): Promise<Section> {
    return this.sectionRepository.findById(id);
  }
}