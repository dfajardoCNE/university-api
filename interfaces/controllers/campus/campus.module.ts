import { Module } from '@nestjs/common';
import { CampusController } from './campus.controller';
import { CampusRepositoryImpl } from '../../../infrastructure/database/repositories/campus/campus.repository.impl';
import { GetAllCampusesUseCase } from '../../../domain/use-cases/campus/get-all-campuses.use-case';
import { GetCampusByIdUseCase } from '../../../domain/use-cases/campus/get-campus-by-id.use-case';
import { CreateCampusUseCase } from '../../../domain/use-cases/campus/create-campus.use-case';
import { UpdateCampusUseCase } from '../../../domain/use-cases/campus/update-campus.use-case';
import { DeleteCampusUseCase } from '../../../domain/use-cases/campus/delete-campus.use-case';

@Module({
  controllers: [CampusController],
  providers: [
    {
      provide: 'CampusRepository',
      useClass: CampusRepositoryImpl,
    },
    {
      provide: GetAllCampusesUseCase,
      useFactory: (campusRepository) => new GetAllCampusesUseCase(campusRepository),
      inject: ['CampusRepository'],
    },
    {
      provide: GetCampusByIdUseCase,
      useFactory: (campusRepository) => new GetCampusByIdUseCase(campusRepository),
      inject: ['CampusRepository'],
    },
    {
      provide: CreateCampusUseCase,
      useFactory: (campusRepository) => new CreateCampusUseCase(campusRepository),
      inject: ['CampusRepository'],
    },
    {
      provide: UpdateCampusUseCase,
      useFactory: (campusRepository) => new UpdateCampusUseCase(campusRepository),
      inject: ['CampusRepository'],
    },
    {
      provide: DeleteCampusUseCase,
      useFactory: (campusRepository) => new DeleteCampusUseCase(campusRepository),
      inject: ['CampusRepository'],
    },
  ],
})
export class CampusModule {}