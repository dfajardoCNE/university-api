export class Submission {
  id: number;
  studentId: number;
  examId?: number;
  practiceId?: number;
  assignmentId?: number;
  filePath?: string;
  grade?: number;
  feedback?: string;
  submittedAt: Date;
}