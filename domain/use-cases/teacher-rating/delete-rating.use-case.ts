import { TeacherRatingRepository } from '../../repositories/teacher-rating.repository';

export class DeleteRatingUseCase {
  constructor(private teacherRatingRepository: TeacherRatingRepository) {}

  async execute(id: number): Promise<void> {
    return this.teacherRatingRepository.delete(id);
  }
}