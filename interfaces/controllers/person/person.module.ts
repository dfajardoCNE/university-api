import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { GetAllPersonsUseCase } from '../../../domain/use-cases/person/get-all-persons.use-case';
import { GetPersonByIdUseCase } from '../../../domain/use-cases/person/get-person-by-id.use-case';
import { CreatePersonUseCase } from '../../../domain/use-cases/person/create-person.use-case';
import { UpdatePersonUseCase } from '../../../domain/use-cases/person/update-person.use-case';
import { DeletePersonUseCase } from '../../../domain/use-cases/person/delete-person.use-case';
import { PersonRepositoryImpl } from '../../../infrastructure/database/repositories/person/person.repository.impl';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';

const PERSON_REPOSITORY = 'PersonRepository';

@Module({
  imports: [PrismaModule],
  controllers: [PersonController],
  providers: [
    {
      provide: PERSON_REPOSITORY,
      useClass: PersonRepositoryImpl,
    },
    GetAllPersonsUseCase,
    GetPersonByIdUseCase,
    CreatePersonUseCase,
    UpdatePersonUseCase,
    DeletePersonUseCase,
  ],
  exports: [PERSON_REPOSITORY],
})
export class PersonModule {}