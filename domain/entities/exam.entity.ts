export class Exam {
  id: number;
  courseId: number;
  professorId: number;
  title: string;
  description?: string;
  examDate: Date;
  weight: number;
  createdAt: Date;
}