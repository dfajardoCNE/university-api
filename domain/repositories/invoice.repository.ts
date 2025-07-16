import { Invoice } from '../entities/invoice.entity';

export interface InvoiceRepository {
  findAll(): Promise<Invoice[]>;
  findById(id: number): Promise<Invoice>;
  findByStudent(studentId: number): Promise<Invoice[]>;
  findByStatus(status: string): Promise<Invoice[]>;
  findByTerm(termId: number): Promise<Invoice[]>;
  findByStudentAndTerm(studentId: number, termId: number): Promise<Invoice[]>;
  findPendingByStudent(studentId: number): Promise<Invoice[]>;
  create(invoice: Partial<Invoice>): Promise<Invoice>;
  update(id: number, invoice: Partial<Invoice>): Promise<Invoice>;
  updateStatus(id: number, status: string): Promise<Invoice>;
  delete(id: number): Promise<void>;
}