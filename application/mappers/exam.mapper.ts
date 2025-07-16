import { Exam } from '../../domain/entities/exam.entity';
import { ExamResponseDto } from '../dto/exam/exam-response.dto';

export class ExamMapper {
  static toResponseDto(exam: Exam): ExamResponseDto {
    return {
      id: exam.id,
      courseId: exam.courseId,
      professorId: exam.professorId,
      title: exam.title,
      description: exam.description,
      examDate: exam.examDate,
      weight: exam.weight,
      createdAt: exam.createdAt,
    } as any;
  }

  static toResponseDtoArray(exams: Exam[]): ExamResponseDto[] {
    return exams.map(exam => this.toResponseDto(exam));
  }
}