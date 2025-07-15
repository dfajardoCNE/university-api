import { Module } from '@nestjs/common';
import { CareerController } from './career.controller';
import { CareerRepositoryImpl } from '../../../infrastructure/database/repositories/career/career.repository.impl';
import { GetAllCareersUseCase } from '../../../domain/use-cases/career/get-all-careers.use-case';
import { GetCareerByIdUseCase } from '../../../domain/use-cases/career/get-career-by-id.use-case';
import { GetCareersByDepartmentUseCase } from '../../../domain/use-cases/career/get-careers-by-department.use-case';
import { CreateCareerUseCase } from '../../../domain/use-cases/career/create-career.use-case';
import { UpdateCareerUseCase } from '../../../domain/use-cases/career/update-career.use-case';
import { DeleteCareerUseCase } from '../../../domain/use-cases/career/delete-career.use-case';

@Module({
  controllers: [CareerController],
  providers: [
    {
      provide: 'CareerRepository',
      useClass: CareerRepositoryImpl,
    },
    {
      provide: GetAllCareersUseCase,
      useFactory: (careerRepository) => new GetAllCareersUseCase(careerRepository),
      inject: ['CareerRepository'],
    },
    {
      provide: GetCareerByIdUseCase,
      useFactory: (careerRepository) => new GetCareerByIdUseCase(careerRepository),
      inject: ['CareerRepository'],
    },
    {
      provide: GetCareersByDepartmentUseCase,
      useFactory: (careerRepository) => new GetCareersByDepartmentUseCase(careerRepository),
      inject: ['CareerRepository'],
    },
    {
      provide: CreateCareerUseCase,
      useFactory: (careerRepository) => new CreateCareerUseCase(careerRepository),
      inject: ['CareerRepository'],
    },
    {
      provide: UpdateCareerUseCase,
      useFactory: (careerRepository) => new UpdateCareerUseCase(careerRepository),
      inject: ['CareerRepository'],
    },
    {
      provide: DeleteCareerUseCase,
      useFactory: (careerRepository) => new DeleteCareerUseCase(careerRepository),
      inject: ['CareerRepository'],
    },
  ],
})
export class CareerModule {}