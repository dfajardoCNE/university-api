import { Module } from '@nestjs/common';
import { SubmissionController } from './submission.controller';
import { SubmissionRepositoryImpl } from '../../../infrastructure/database/repositories/submission/submission.repository.impl';
import { GetAllSubmissionsUseCase } from '../../../domain/use-cases/submission/get-all-submissions.use-case';
import { GetSubmissionByIdUseCase } from '../../../domain/use-cases/submission/get-submission-by-id.use-case';
import { GetSubmissionsByStudentUseCase } from '../../../domain/use-cases/submission/get-submissions-by-student.use-case';
import { GetSubmissionsByAssignmentUseCase } from '../../../domain/use-cases/submission/get-submissions-by-assignment.use-case';
import { CreateSubmissionUseCase } from '../../../domain/use-cases/submission/create-submission.use-case';
import { UpdateSubmissionUseCase } from '../../../domain/use-cases/submission/update-submission.use-case';
import { DeleteSubmissionUseCase } from '../../../domain/use-cases/submission/delete-submission.use-case';

@Module({
  controllers: [SubmissionController],
  providers: [
    {
      provide: 'SubmissionRepository',
      useClass: SubmissionRepositoryImpl,
    },
    {
      provide: GetAllSubmissionsUseCase,
      useFactory: (repo) => new GetAllSubmissionsUseCase(repo),
      inject: ['SubmissionRepository'],
    },
    {
      provide: GetSubmissionByIdUseCase,
      useFactory: (repo) => new GetSubmissionByIdUseCase(repo),
      inject: ['SubmissionRepository'],
    },
    {
      provide: GetSubmissionsByStudentUseCase,
      useFactory: (repo) => new GetSubmissionsByStudentUseCase(repo),
      inject: ['SubmissionRepository'],
    },
    {
      provide: GetSubmissionsByAssignmentUseCase,
      useFactory: (repo) => new GetSubmissionsByAssignmentUseCase(repo),
      inject: ['SubmissionRepository'],
    },
    {
      provide: CreateSubmissionUseCase,
      useFactory: (repo) => new CreateSubmissionUseCase(repo),
      inject: ['SubmissionRepository'],
    },
    {
      provide: UpdateSubmissionUseCase,
      useFactory: (repo) => new UpdateSubmissionUseCase(repo),
      inject: ['SubmissionRepository'],
    },
    {
      provide: DeleteSubmissionUseCase,
      useFactory: (repo) => new DeleteSubmissionUseCase(repo),
      inject: ['SubmissionRepository'],
    },
  ],
})
export class SubmissionModule {}