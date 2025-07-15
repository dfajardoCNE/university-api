import { Report } from '../../entities/report.entity';
import { ReportRepository } from '../../repositories/report.repository';

export class GetAllReportsUseCase {
  constructor(private reportRepository: ReportRepository) {}

  async execute(): Promise<Report[]> {
    return this.reportRepository.findAll();
  }
}