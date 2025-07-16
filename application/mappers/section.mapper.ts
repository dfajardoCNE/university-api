import { Section } from '../../domain/entities/section.entity';
import { SectionResponseDto } from '../dto/section/section-response.dto';

export class SectionMapper {
  static toResponseDto(section: Section): SectionResponseDto {
    return {
      id: section.id,
      courseId: section.courseId,
      termId: section.termId,
      sessionTimeId: section.sessionTimeId,
      professorId: section.professorId,
      classroomId: section.classroomId,
      createdAt: section.createdAt,
    };
  }

  static toResponseDtoArray(sections: Section[]): SectionResponseDto[] {
    return sections.map(section => this.toResponseDto(section));
  }
}