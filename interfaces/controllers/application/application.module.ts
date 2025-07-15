import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationRepositoryImpl } from '../../../infrastructure/database/repositories/application/application.repository.impl';
import { GetAllApplicationsUseCase } from '../../../domain/use-cases/application/get-all-applications.use-case';
import { GetApplicationByIdUseCase } from '../../../domain/use-cases/application/get-application-by-id.use-case';
import { GetApplicationsByPersonUseCase } from '../../../domain/use-cases/application/get-applications-by-person.use-case';
import { GetApplicationsByStatusUseCase } from '../../../domain/use-cases/application/get-applications-by-status.use-case';
import { CreateApplicationUseCase } from '../../../domain/use-cases/application/create-application.use-case';
import { UpdateApplicationUseCase } from '../../../domain/use-cases/application/update-application.use-case';
import { DeleteApplicationUseCase } from '../../../domain/use-cases/application/delete-application.use-case';

@Module({
  controllers: [ApplicationController],
  providers: [
    {
      provide: 'ApplicationRepository',
      useClass: ApplicationRepositoryImpl,
    },
    {
      provide: GetAllApplicationsUseCase,
      useFactory: (repo) => new GetAllApplicationsUseCase(repo),
      inject: ['ApplicationRepository'],
    },
    {
      provide: GetApplicationByIdUseCase,
      useFactory: (repo) => new GetApplicationByIdUseCase(repo),
      inject: ['ApplicationRepository'],
    },
    {
      provide: GetApplicationsByPersonUseCase,
      useFactory: (repo) => new GetApplicationsByPersonUseCase(repo),
      inject: ['ApplicationRepository'],
    },
    {
      provide: GetApplicationsByStatusUseCase,
      useFactory: (repo) => new GetApplicationsByStatusUseCase(repo),
      inject: ['ApplicationRepository'],
    },
    {
      provide: CreateApplicationUseCase,
      useFactory: (repo) => new CreateApplicationUseCase(repo),
      inject: ['ApplicationRepository'],
    },
    {
      provide: UpdateApplicationUseCase,
      useFactory: (repo) => new UpdateApplicationUseCase(repo),
      inject: ['ApplicationRepository'],
    },
    {
      provide: DeleteApplicationUseCase,
      useFactory: (repo) => new DeleteApplicationUseCase(repo),
      inject: ['ApplicationRepository'],
    },
  ],
})
export class ApplicationModule {}