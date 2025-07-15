import { Report } from '../../entities/report.entity';
import { ReportRepository } from '../../repositories/report.repository';

export class UpdateReportStatusUseCase {
  constructor(private reportRepository: ReportRepository) {}

  async execute(id: number, status: string): Promise<Report> {
    return this.reportRepository.updateStatus(id, status);
  }
}