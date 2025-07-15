export class TeacherRating {
  id: number;
  studentId: number;
  professorId: number;
  rating: number;
  comment?: string;
  createdAt: Date;
}