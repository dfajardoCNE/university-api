export class Professor {
  id: number;
  personId: number;
  hireDate: Date;
  createdAt: Date;
  
  // Campos para uso en consultas con joins
  firstName?: string;
  lastName?: string;
  email?: string;
  departmentName?: string;
}