export interface StudentSection {
  id: number;
  studentId: number;
  sectionId: number;
  status: string; // 'active', 'completed', 'dropped', 'failed'
  currentGrade?: number;
  finalGrade?: number;
  createdAt: Date;
  updatedAt?: Date;
}