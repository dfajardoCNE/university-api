import { Module } from '@nestjs/common';
import { ProfessorController } from './professor.controller';
import { ProfessorRepositoryImpl } from '../../../infrastructure/database/repositories/professor/professor.repository.impl';
import { GetAllProfessorsUseCase } from '../../../domain/use-cases/professor/get-all-professors.use-case';
import { GetProfessorByIdUseCase } from '../../../domain/use-cases/professor/get-professor-by-id.use-case';
import { CreateProfessorUseCase } from '../../../domain/use-cases/professor/create-professor.use-case';
import { UpdateProfessorUseCase } from '../../../domain/use-cases/professor/update-professor.use-case';
import { DeleteProfessorUseCase } from '../../../domain/use-cases/professor/delete-professor.use-case';

@Module({
  controllers: [ProfessorController],
  providers: [
    {
      provide: 'ProfessorRepository',
      useClass: ProfessorRepositoryImpl,
    },
    {
      provide: GetAllProfessorsUseCase,
      useFactory: (professorRepository) => new GetAllProfessorsUseCase(professorRepository),
      inject: ['ProfessorRepository'],
    },
    {
      provide: GetProfessorByIdUseCase,
      useFactory: (professorRepository) => new GetProfessorByIdUseCase(professorRepository),
      inject: ['ProfessorRepository'],
    },
    {
      provide: CreateProfessorUseCase,
      useFactory: (professorRepository) => new CreateProfessorUseCase(professorRepository),
      inject: ['ProfessorRepository'],
    },
    {
      provide: UpdateProfessorUseCase,
      useFactory: (professorRepository) => new UpdateProfessorUseCase(professorRepository),
      inject: ['ProfessorRepository'],
    },
    {
      provide: DeleteProfessorUseCase,
      useFactory: (professorRepository) => new DeleteProfessorUseCase(professorRepository),
      inject: ['ProfessorRepository'],
    },
  ],
})
export class ProfessorModule {}