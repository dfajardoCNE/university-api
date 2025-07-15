import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamRepositoryImpl } from '../../../infrastructure/database/repositories/exam/exam.repository.impl';
import { GetAllExamsUseCase } from '../../../domain/use-cases/exam/get-all-exams.use-case';
import { GetExamByIdUseCase } from '../../../domain/use-cases/exam/get-exam-by-id.use-case';
import { GetExamsByCourseUseCase } from '../../../domain/use-cases/exam/get-exams-by-course.use-case';
import { GetExamsByProfessorUseCase } from '../../../domain/use-cases/exam/get-exams-by-professor.use-case';
import { CreateExamUseCase } from '../../../domain/use-cases/exam/create-exam.use-case';
import { UpdateExamUseCase } from '../../../domain/use-cases/exam/update-exam.use-case';
import { DeleteExamUseCase } from '../../../domain/use-cases/exam/delete-exam.use-case';

@Module({
  controllers: [ExamController],
  providers: [
    {
      provide: 'ExamRepository',
      useClass: ExamRepositoryImpl,
    },
    {
      provide: GetAllExamsUseCase,
      useFactory: (repo) => new GetAllExamsUseCase(repo),
      inject: ['ExamRepository'],
    },
    {
      provide: GetExamByIdUseCase,
      useFactory: (repo) => new GetExamByIdUseCase(repo),
      inject: ['ExamRepository'],
    },
    {
      provide: GetExamsByCourseUseCase,
      useFactory: (repo) => new GetExamsByCourseUseCase(repo),
      inject: ['ExamRepository'],
    },
    {
      provide: GetExamsByProfessorUseCase,
      useFactory: (repo) => new GetExamsByProfessorUseCase(repo),
      inject: ['ExamRepository'],
    },
    {
      provide: CreateExamUseCase,
      useFactory: (repo) => new CreateExamUseCase(repo),
      inject: ['ExamRepository'],
    },
    {
      provide: UpdateExamUseCase,
      useFactory: (repo) => new UpdateExamUseCase(repo),
      inject: ['ExamRepository'],
    },
    {
      provide: DeleteExamUseCase,
      useFactory: (repo) => new DeleteExamUseCase(repo),
      inject: ['ExamRepository'],
    },
  ],
})
export class ExamModule {}