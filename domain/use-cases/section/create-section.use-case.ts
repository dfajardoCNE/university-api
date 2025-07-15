import { Section } from '../../entities/section.entity';
import { SectionRepository } from '../../repositories/section.repository';

export class CreateSectionUseCase {
  constructor(private sectionRepository: SectionRepository) {}

  async execute(section: Partial<Section>): Promise<Section> {
    return this.sectionRepository.create(section);
  }
}