import { Module } from '@nestjs/common';
import { PracticeController } from './practice.controller';
import { PracticeRepositoryImpl } from '../../../infrastructure/database/repositories/practice/practice.repository.impl';
import { GetAllPracticesUseCase } from '../../../domain/use-cases/practice/get-all-practices.use-case';
import { GetPracticeByIdUseCase } from '../../../domain/use-cases/practice/get-practice-by-id.use-case';
import { GetPracticesByCourseUseCase } from '../../../domain/use-cases/practice/get-practices-by-course.use-case';
import { CreatePracticeUseCase } from '../../../domain/use-cases/practice/create-practice.use-case';
import { UpdatePracticeUseCase } from '../../../domain/use-cases/practice/update-practice.use-case';
import { DeletePracticeUseCase } from '../../../domain/use-cases/practice/delete-practice.use-case';

@Module({
  controllers: [PracticeController],
  providers: [
    {
      provide: 'PracticeRepository',
      useClass: PracticeRepositoryImpl,
    },
    {
      provide: GetAllPracticesUseCase,
      useFactory: (repo) => new GetAllPracticesUseCase(repo),
      inject: ['PracticeRepository'],
    },
    {
      provide: GetPracticeByIdUseCase,
      useFactory: (repo) => new GetPracticeByIdUseCase(repo),
      inject: ['PracticeRepository'],
    },
    {
      provide: GetPracticesByCourseUseCase,
      useFactory: (repo) => new GetPracticesByCourseUseCase(repo),
      inject: ['PracticeRepository'],
    },
    {
      provide: CreatePracticeUseCase,
      useFactory: (repo) => new CreatePracticeUseCase(repo),
      inject: ['PracticeRepository'],
    },
    {
      provide: UpdatePracticeUseCase,
      useFactory: (repo) => new UpdatePracticeUseCase(repo),
      inject: ['PracticeRepository'],
    },
    {
      provide: DeletePracticeUseCase,
      useFactory: (repo) => new DeletePracticeUseCase(repo),
      inject: ['PracticeRepository'],
    },
  ],
})
export class PracticeModule {}