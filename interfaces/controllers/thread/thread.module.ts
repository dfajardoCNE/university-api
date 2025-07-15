import { Module } from '@nestjs/common';
import { ThreadController } from './thread.controller';
import { ThreadRepositoryImpl } from '../../../infrastructure/database/repositories/thread/thread.repository.impl';
import { GetAllThreadsUseCase } from '../../../domain/use-cases/thread/get-all-threads.use-case';
import { GetThreadByIdUseCase } from '../../../domain/use-cases/thread/get-thread-by-id.use-case';
import { GetThreadsByUserUseCase } from '../../../domain/use-cases/thread/get-threads-by-user.use-case';
import { CreateThreadUseCase } from '../../../domain/use-cases/thread/create-thread.use-case';
import { UpdateThreadUseCase } from '../../../domain/use-cases/thread/update-thread.use-case';
import { DeleteThreadUseCase } from '../../../domain/use-cases/thread/delete-thread.use-case';

@Module({
  controllers: [ThreadController],
  providers: [
    {
      provide: 'ThreadRepository',
      useClass: ThreadRepositoryImpl,
    },
    {
      provide: GetAllThreadsUseCase,
      useFactory: (repo) => new GetAllThreadsUseCase(repo),
      inject: ['ThreadRepository'],
    },
    {
      provide: GetThreadByIdUseCase,
      useFactory: (repo) => new GetThreadByIdUseCase(repo),
      inject: ['ThreadRepository'],
    },
    {
      provide: GetThreadsByUserUseCase,
      useFactory: (repo) => new GetThreadsByUserUseCase(repo),
      inject: ['ThreadRepository'],
    },
    {
      provide: CreateThreadUseCase,
      useFactory: (repo) => new CreateThreadUseCase(repo),
      inject: ['ThreadRepository'],
    },
    {
      provide: UpdateThreadUseCase,
      useFactory: (repo) => new UpdateThreadUseCase(repo),
      inject: ['ThreadRepository'],
    },
    {
      provide: DeleteThreadUseCase,
      useFactory: (repo) => new DeleteThreadUseCase(repo),
      inject: ['ThreadRepository'],
    },
  ],
})
export class ThreadModule {}