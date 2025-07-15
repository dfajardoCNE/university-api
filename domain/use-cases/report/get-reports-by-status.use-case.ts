import { Report } from '../../entities/report.entity';
import { ReportRepository } from '../../repositories/report.repository';

export class GetReportsByStatusUseCase {
  constructor(private reportRepository: ReportRepository) {}

  async execute(status: string): Promise<Report[]> {
    return this.reportRepository.findByStatus(status);
  }
}