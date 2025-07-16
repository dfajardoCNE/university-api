export class Invoice {
  id: number;
  studentId: number;
  amount: number;
  concept: string;
  dueDate: Date;
  status: string; // 'pending', 'paid', 'overdue', 'cancelled'
  termId?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Relaciones
  payments?: any[]; // Pagos asociados a esta factura
}