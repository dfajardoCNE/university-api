import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { GetAllRolesUseCase } from '../../../domain/use-cases/role/get-all-roles.use-case';
import { GetRoleByIdUseCase } from '../../../domain/use-cases/role/get-role-by-id.use-case';
import { CreateRoleUseCase } from '../../../domain/use-cases/role/create-role.use-case';
import { UpdateRoleUseCase } from '../../../domain/use-cases/role/update-role.use-case';
import { DeleteRoleUseCase } from '../../../domain/use-cases/role/delete-role.use-case';
import { RoleRepositoryImpl } from '../../../infrastructure/database/repositories/role/role.repository.impl';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';

const ROLE_REPOSITORY = 'RoleRepository';

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleRepositoryImpl,
    },
    GetAllRolesUseCase,
    GetRoleByIdUseCase,
    CreateRoleUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
  ],
  exports: [ROLE_REPOSITORY],
})
export class RoleModule {}