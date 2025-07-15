import { TeacherRating } from '../../entities/teacher-rating.entity';
import { TeacherRatingRepository } from '../../repositories/teacher-rating.repository';

export class GetRatingsByStudentUseCase {
  constructor(private teacherRatingRepository: TeacherRatingRepository) {}

  async execute(studentId: number): Promise<TeacherRating[]> {
    return this.teacherRatingRepository.findByStudent(studentId);
  }
}