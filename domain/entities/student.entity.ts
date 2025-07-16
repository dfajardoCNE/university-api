export class Student {
  id: number;
  personId: number;
  careerId: number;
  campusId: number;
  enrollmentDate: Date;
  status: string;
  academicStatus: string;
  gpa: number;
  createdAt: Date;
  updatedAt?: Date;
  
  // Campos para uso en consultas con joins
  firstName?: string;
  lastName?: string;
  email?: string;
}