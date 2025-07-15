import { Section } from '../../entities/section.entity';
import { SectionRepository } from '../../repositories/section.repository';

export class GetSectionsByCourseUseCase {
  constructor(private sectionRepository: SectionRepository) {}

  async execute(courseId: number): Promise<Section[]> {
    return this.sectionRepository.findByCourse(courseId);
  }
}