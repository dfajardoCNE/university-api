import { Report } from '../../entities/report.entity';
import { ReportRepository } from '../../repositories/report.repository';

export class CreateReportUseCase {
  constructor(private reportRepository: ReportRepository) {}

  async execute(report: Partial<Report>): Promise<Report> {
    return this.reportRepository.create({
      ...report,
      status: 'pending',
    });
  }
}