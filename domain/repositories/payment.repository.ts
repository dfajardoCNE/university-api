import { Payment } from '../entities/payment.entity';

export interface PaymentRepository {
  findAll(): Promise<Payment[]>;
  findById(id: number): Promise<Payment>;
  findByStudent(studentId: number): Promise<Payment[]>;
  findByStatus(status: string): Promise<Payment[]>;
  findByTerm(termId: number): Promise<Payment[]>;
  findByStudentAndTerm(studentId: number, termId: number): Promise<Payment[]>;
  create(payment: Partial<Payment>): Promise<Payment>;
  update(id: number, payment: Partial<Payment>): Promise<Payment>;
  delete(id: number): Promise<void>;
  findRecent(limit: number): Promise<any[]>;
  getMonthlyRevenue(): Promise<number>;
}