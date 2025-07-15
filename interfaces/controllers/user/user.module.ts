import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepositoryImpl } from '../../../infrastructure/database/repositories/user/user.repository.impl';
import { PersonRepositoryImpl } from '../../../infrastructure/database/repositories/person/person.repository.impl';
import { RoleRepositoryImpl } from '../../../infrastructure/database/repositories/role/role.repository.impl';
import { RegisterUserUseCase } from '../../../domain/use-cases/user/register-user.use-case';
import { GetUserByIdUseCase } from '../../../domain/use-cases/user/get-user-by-id.use-case';
import { GetAllUsersUseCase } from '../../../domain/use-cases/user/get-all-users.use-case';
import { UpdateUserUseCase } from '../../../domain/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '../../../domain/use-cases/user/delete-user.use-case';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
    {
      provide: 'PersonRepository',
      useClass: PersonRepositoryImpl,
    },
    {
      provide: 'RoleRepository',
      useClass: RoleRepositoryImpl,
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (userRepo, personRepo, roleRepo) => 
        new RegisterUserUseCase(userRepo, personRepo, roleRepo),
      inject: ['UserRepository', 'PersonRepository', 'RoleRepository'],
    },
    {
      provide: GetUserByIdUseCase,
      useFactory: (userRepo) => new GetUserByIdUseCase(userRepo),
      inject: ['UserRepository'],
    },
    {
      provide: GetAllUsersUseCase,
      useFactory: (userRepo) => new GetAllUsersUseCase(userRepo),
      inject: ['UserRepository'],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (userRepo, personRepo) => 
        new UpdateUserUseCase(userRepo, personRepo),
      inject: ['UserRepository', 'PersonRepository'],
    },
    {
      provide: DeleteUserUseCase,
      useFactory: (userRepo) => new DeleteUserUseCase(userRepo),
      inject: ['UserRepository'],
    },
  ],
})
export class UserModule {}