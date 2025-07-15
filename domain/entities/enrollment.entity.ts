export class Enrollment {
  id: number;
  studentId: number;
  sectionId: number;
  enrollmentDate: Date;
  grade?: number;
  status: string;
  createdAt: Date;
}