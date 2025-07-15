import { Section } from '../../entities/section.entity';
import { SectionRepository } from '../../repositories/section.repository';

export class UpdateSectionUseCase {
  constructor(private sectionRepository: SectionRepository) {}

  async execute(id: number, section: Partial<Section>): Promise<Section> {
    return this.sectionRepository.update(id, section);
  }
}