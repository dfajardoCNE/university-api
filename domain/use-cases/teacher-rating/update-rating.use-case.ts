import { TeacherRating } from '../../entities/teacher-rating.entity';
import { TeacherRatingRepository } from '../../repositories/teacher-rating.repository';

export class UpdateRatingUseCase {
  constructor(private teacherRatingRepository: TeacherRatingRepository) {}

  async execute(id: number, rating: Partial<TeacherRating>): Promise<TeacherRating> {
    return this.teacherRatingRepository.update(id, rating);
  }
}