import { TeacherRating } from '../../entities/teacher-rating.entity';
import { TeacherRatingRepository } from '../../repositories/teacher-rating.repository';

export class CreateRatingUseCase {
  constructor(private teacherRatingRepository: TeacherRatingRepository) {}

  async execute(rating: Partial<TeacherRating>): Promise<TeacherRating> {
    return this.teacherRatingRepository.create(rating);
  }
}