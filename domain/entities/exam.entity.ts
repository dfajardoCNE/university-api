export class Exam {
  id: number;
  courseId: number;
  professorId: number;
  title: string;
  description?: string;
  examDate: Date;
  duration: number;
  totalPoints: number;
  createdAt: Date;
  updatedAt?: Date;
}