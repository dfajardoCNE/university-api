import { Module } from '@nestjs/common';
import { UniversityController } from './university.controller';
import { UniversityRepositoryImpl } from '../../../infrastructure/database/repositories/university/university.repository.impl';
import { GetAllUniversitiesUseCase } from '../../../domain/use-cases/university/get-all-universities.use-case';
import { GetUniversityByIdUseCase } from '../../../domain/use-cases/university/get-university-by-id.use-case';
import { CreateUniversityUseCase } from '../../../domain/use-cases/university/create-university.use-case';
import { UpdateUniversityUseCase } from '../../../domain/use-cases/university/update-university.use-case';
import { DeleteUniversityUseCase } from '../../../domain/use-cases/university/delete-university.use-case';

@Module({
  controllers: [UniversityController],
  providers: [
    {
      provide: 'UniversityRepository',
      useClass: UniversityRepositoryImpl,
    },
    {
      provide: GetAllUniversitiesUseCase,
      useFactory: (universityRepository) => new GetAllUniversitiesUseCase(universityRepository),
      inject: ['UniversityRepository'],
    },
    {
      provide: GetUniversityByIdUseCase,
      useFactory: (universityRepository) => new GetUniversityByIdUseCase(universityRepository),
      inject: ['UniversityRepository'],
    },
    {
      provide: CreateUniversityUseCase,
      useFactory: (universityRepository) => new CreateUniversityUseCase(universityRepository),
      inject: ['UniversityRepository'],
    },
    {
      provide: UpdateUniversityUseCase,
      useFactory: (universityRepository) => new UpdateUniversityUseCase(universityRepository),
      inject: ['UniversityRepository'],
    },
    {
      provide: DeleteUniversityUseCase,
      useFactory: (universityRepository) => new DeleteUniversityUseCase(universityRepository),
      inject: ['UniversityRepository'],
    },
  ],
})
export class UniversityModule {}