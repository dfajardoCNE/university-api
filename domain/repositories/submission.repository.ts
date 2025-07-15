import { Submission } from '../entities/submission.entity';

export interface SubmissionRepository {
  findAll(): Promise<Submission[]>;
  findById(id: number): Promise<Submission>;
  findByStudent(studentId: number): Promise<Submission[]>;
  findByExam(examId: number): Promise<Submission[]>;
  findByPractice(practiceId: number): Promise<Submission[]>;
  findByAssignment(assignmentId: number): Promise<Submission[]>;
  create(submission: Partial<Submission>): Promise<Submission>;
  update(id: number, submission: Partial<Submission>): Promise<Submission>;
  delete(id: number): Promise<void>;
}