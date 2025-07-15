import { Section } from '../../entities/section.entity';
import { SectionRepository } from '../../repositories/section.repository';

export class GetAllSectionsUseCase {
  constructor(private sectionRepository: SectionRepository) {}

  async execute(): Promise<Section[]> {
    return this.sectionRepository.findAll();
  }
}