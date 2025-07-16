export class Payment {
  id: number;
  studentId: number;
  amount: number;
  concept: string;
  paymentDate: Date;
  status: string; // 'pending', 'completed', 'failed', 'refunded'
  paymentMethod: string;
  referenceNumber: string;
  termId?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}