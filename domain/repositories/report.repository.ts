import { Report } from '../entities/report.entity';

export interface ReportRepository {
  findAll(): Promise<Report[]>;
  findById(id: number): Promise<Report>;
  findByStatus(status: string): Promise<Report[]>;
  findByUser(userId: number): Promise<Report[]>;
  create(report: Partial<Report>): Promise<Report>;
  updateStatus(id: number, status: string): Promise<Report>;
  delete(id: number): Promise<void>;
}