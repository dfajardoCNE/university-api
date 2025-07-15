import { Module } from '@nestjs/common';
import { BuildingController } from './building.controller';
import { BuildingRepositoryImpl } from '../../../infrastructure/database/repositories/building/building.repository.impl';
import { GetAllBuildingsUseCase } from '../../../domain/use-cases/building/get-all-buildings.use-case';
import { GetBuildingByIdUseCase } from '../../../domain/use-cases/building/get-building-by-id.use-case';
import { GetBuildingsByCampusUseCase } from '../../../domain/use-cases/building/get-buildings-by-campus.use-case';
import { CreateBuildingUseCase } from '../../../domain/use-cases/building/create-building.use-case';
import { UpdateBuildingUseCase } from '../../../domain/use-cases/building/update-building.use-case';
import { DeleteBuildingUseCase } from '../../../domain/use-cases/building/delete-building.use-case';

@Module({
  controllers: [BuildingController],
  providers: [
    {
      provide: 'BuildingRepository',
      useClass: BuildingRepositoryImpl,
    },
    {
      provide: GetAllBuildingsUseCase,
      useFactory: (buildingRepository) => new GetAllBuildingsUseCase(buildingRepository),
      inject: ['BuildingRepository'],
    },
    {
      provide: GetBuildingByIdUseCase,
      useFactory: (buildingRepository) => new GetBuildingByIdUseCase(buildingRepository),
      inject: ['BuildingRepository'],
    },
    {
      provide: GetBuildingsByCampusUseCase,
      useFactory: (buildingRepository) => new GetBuildingsByCampusUseCase(buildingRepository),
      inject: ['BuildingRepository'],
    },
    {
      provide: CreateBuildingUseCase,
      useFactory: (buildingRepository) => new CreateBuildingUseCase(buildingRepository),
      inject: ['BuildingRepository'],
    },
    {
      provide: UpdateBuildingUseCase,
      useFactory: (buildingRepository) => new UpdateBuildingUseCase(buildingRepository),
      inject: ['BuildingRepository'],
    },
    {
      provide: DeleteBuildingUseCase,
      useFactory: (buildingRepository) => new DeleteBuildingUseCase(buildingRepository),
      inject: ['BuildingRepository'],
    },
  ],
})
export class BuildingModule {}