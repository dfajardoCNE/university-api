import { SectionRepository } from '../../repositories/section.repository';

export class DeleteSectionUseCase {
  constructor(private sectionRepository: SectionRepository) {}

  async execute(id: number): Promise<void> {
    return this.sectionRepository.delete(id);
  }
}