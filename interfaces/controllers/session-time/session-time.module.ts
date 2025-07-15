import { Module } from '@nestjs/common';
import { SessionTimeController } from './session-time.controller';
import { SessionTimeRepositoryImpl } from '../../../infrastructure/database/repositories/session-time/session-time.repository.impl';
import { GetAllSessionTimesUseCase } from '../../../domain/use-cases/session-time/get-all-session-times.use-case';
import { GetSessionTimeByIdUseCase } from '../../../domain/use-cases/session-time/get-session-time-by-id.use-case';
import { GetSessionTimesByDayUseCase } from '../../../domain/use-cases/session-time/get-session-times-by-day.use-case';
import { CreateSessionTimeUseCase } from '../../../domain/use-cases/session-time/create-session-time.use-case';
import { UpdateSessionTimeUseCase } from '../../../domain/use-cases/session-time/update-session-time.use-case';
import { DeleteSessionTimeUseCase } from '../../../domain/use-cases/session-time/delete-session-time.use-case';

@Module({
  controllers: [SessionTimeController],
  providers: [
    {
      provide: 'SessionTimeRepository',
      useClass: SessionTimeRepositoryImpl,
    },
    {
      provide: GetAllSessionTimesUseCase,
      useFactory: (sessionTimeRepository) => new GetAllSessionTimesUseCase(sessionTimeRepository),
      inject: ['SessionTimeRepository'],
    },
    {
      provide: GetSessionTimeByIdUseCase,
      useFactory: (sessionTimeRepository) => new GetSessionTimeByIdUseCase(sessionTimeRepository),
      inject: ['SessionTimeRepository'],
    },
    {
      provide: GetSessionTimesByDayUseCase,
      useFactory: (sessionTimeRepository) => new GetSessionTimesByDayUseCase(sessionTimeRepository),
      inject: ['SessionTimeRepository'],
    },
    {
      provide: CreateSessionTimeUseCase,
      useFactory: (sessionTimeRepository) => new CreateSessionTimeUseCase(sessionTimeRepository),
      inject: ['SessionTimeRepository'],
    },
    {
      provide: UpdateSessionTimeUseCase,
      useFactory: (sessionTimeRepository) => new UpdateSessionTimeUseCase(sessionTimeRepository),
      inject: ['SessionTimeRepository'],
    },
    {
      provide: DeleteSessionTimeUseCase,
      useFactory: (sessionTimeRepository) => new DeleteSessionTimeUseCase(sessionTimeRepository),
      inject: ['SessionTimeRepository'],
    },
  ],
})
export class SessionTimeModule {}