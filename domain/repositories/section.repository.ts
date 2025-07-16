import { Section } from '../entities/section.entity';

export interface SectionRepository {
  findAll(): Promise<Section[]>;
  findById(id: number): Promise<Section>;
  findByCourse(courseId: number): Promise<Section[]>;
  findByProfessor(professorId: number): Promise<Section[]>;
  findByTerm(termId: number): Promise<Section[]>;
  create(section: Partial<Section>): Promise<Section>;
  update(id: number, section: Partial<Section>): Promise<Section>;
  delete(id: number): Promise<void>;
}