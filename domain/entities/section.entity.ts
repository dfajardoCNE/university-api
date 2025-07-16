export class Section {
  id: number;
  courseId: number;
  termId: number;
  sessionTimeId: number;
  professorId: number;
  classroomId: number;
  capacity: number;
  courseName?: string; // Para uso en consultas con joins
  courseCode?: string; // Para uso en consultas con joins
  schedule?: string; // Para uso en consultas con joins
  enrolledCount?: number; // Para uso en consultas con joins
  room?: string; // Para uso en consultas con joins
  professorName?: string; // Para uso en consultas con joins
  createdAt: Date;
}