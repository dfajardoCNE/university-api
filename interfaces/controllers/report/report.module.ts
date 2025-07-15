import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportRepositoryImpl } from '../../../infrastructure/database/repositories/report/report.repository.impl';
import { GetAllReportsUseCase } from '../../../domain/use-cases/report/get-all-reports.use-case';
import { GetReportsByStatusUseCase } from '../../../domain/use-cases/report/get-reports-by-status.use-case';
import { CreateReportUseCase } from '../../../domain/use-cases/report/create-report.use-case';
import { UpdateReportStatusUseCase } from '../../../domain/use-cases/report/update-report-status.use-case';

@Module({
  controllers: [ReportController],
  providers: [
    {
      provide: 'ReportRepository',
      useClass: ReportRepositoryImpl,
    },
    {
      provide: GetAllReportsUseCase,
      useFactory: (repo) => new GetAllReportsUseCase(repo),
      inject: ['ReportRepository'],
    },
    {
      provide: GetReportsByStatusUseCase,
      useFactory: (repo) => new GetReportsByStatusUseCase(repo),
      inject: ['ReportRepository'],
    },
    {
      provide: CreateReportUseCase,
      useFactory: (repo) => new CreateReportUseCase(repo),
      inject: ['ReportRepository'],
    },
    {
      provide: UpdateReportStatusUseCase,
      useFactory: (repo) => new UpdateReportStatusUseCase(repo),
      inject: ['ReportRepository'],
    },
  ],
})
export class ReportModule {}