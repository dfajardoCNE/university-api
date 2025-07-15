import { Module } from '@nestjs/common';
import { CareerCampusController } from './career-campus.controller';
import { CareerCampusRepositoryImpl } from '../../../infrastructure/database/repositories/career-campus/career-campus.repository.impl';
import { GetAllCareerCampusesUseCase } from '../../../domain/use-cases/career-campus/get-all-career-campuses.use-case';
import { GetCareerCampusesByCareerUseCase } from '../../../domain/use-cases/career-campus/get-career-campuses-by-career.use-case';
import { GetCareerCampusesByCampusUseCase } from '../../../domain/use-cases/career-campus/get-career-campuses-by-campus.use-case';
import { CreateCareerCampusUseCase } from '../../../domain/use-cases/career-campus/create-career-campus.use-case';
import { DeleteCareerCampusUseCase } from '../../../domain/use-cases/career-campus/delete-career-campus.use-case';

@Module({
  controllers: [CareerCampusController],
  providers: [
    {
      provide: 'CareerCampusRepository',
      useClass: CareerCampusRepositoryImpl,
    },
    {
      provide: GetAllCareerCampusesUseCase,
      useFactory: (careerCampusRepository) => new GetAllCareerCampusesUseCase(careerCampusRepository),
      inject: ['CareerCampusRepository'],
    },
    {
      provide: GetCareerCampusesByCareerUseCase,
      useFactory: (careerCampusRepository) => new GetCareerCampusesByCareerUseCase(careerCampusRepository),
      inject: ['CareerCampusRepository'],
    },
    {
      provide: GetCareerCampusesByCampusUseCase,
      useFactory: (careerCampusRepository) => new GetCareerCampusesByCampusUseCase(careerCampusRepository),
      inject: ['CareerCampusRepository'],
    },
    {
      provide: CreateCareerCampusUseCase,
      useFactory: (careerCampusRepository) => new CreateCareerCampusUseCase(careerCampusRepository),
      inject: ['CareerCampusRepository'],
    },
    {
      provide: DeleteCareerCampusUseCase,
      useFactory: (careerCampusRepository) => new DeleteCareerCampusUseCase(careerCampusRepository),
      inject: ['CareerCampusRepository'],
    },
  ],
})
export class CareerCampusModule {}