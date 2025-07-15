import { TeacherRating } from '../../entities/teacher-rating.entity';
import { TeacherRatingRepository } from '../../repositories/teacher-rating.repository';

export class GetRatingsByProfessorUseCase {
  constructor(private teacherRatingRepository: TeacherRatingRepository) {}

  async execute(professorId: number): Promise<TeacherRating[]> {
    return this.teacherRatingRepository.findByProfessor(professorId);
  }
}