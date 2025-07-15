import { Module } from '@nestjs/common';
import { FacultyController } from './faculty.controller';
import { FacultyRepositoryImpl } from '../../../infrastructure/database/repositories/faculty/faculty.repository.impl';
import { GetAllFacultiesUseCase } from '../../../domain/use-cases/faculty/get-all-faculties.use-case';
import { GetFacultyByIdUseCase } from '../../../domain/use-cases/faculty/get-faculty-by-id.use-case';
import { GetFacultiesByUniversityUseCase } from '../../../domain/use-cases/faculty/get-faculties-by-university.use-case';
import { CreateFacultyUseCase } from '../../../domain/use-cases/faculty/create-faculty.use-case';
import { UpdateFacultyUseCase } from '../../../domain/use-cases/faculty/update-faculty.use-case';
import { DeleteFacultyUseCase } from '../../../domain/use-cases/faculty/delete-faculty.use-case';

@Module({
  controllers: [FacultyController],
  providers: [
    {
      provide: 'FacultyRepository',
      useClass: FacultyRepositoryImpl,
    },
    {
      provide: GetAllFacultiesUseCase,
      useFactory: (facultyRepository) => new GetAllFacultiesUseCase(facultyRepository),
      inject: ['FacultyRepository'],
    },
    {
      provide: GetFacultyByIdUseCase,
      useFactory: (facultyRepository) => new GetFacultyByIdUseCase(facultyRepository),
      inject: ['FacultyRepository'],
    },
    {
      provide: GetFacultiesByUniversityUseCase,
      useFactory: (facultyRepository) => new GetFacultiesByUniversityUseCase(facultyRepository),
      inject: ['FacultyRepository'],
    },
    {
      provide: CreateFacultyUseCase,
      useFactory: (facultyRepository) => new CreateFacultyUseCase(facultyRepository),
      inject: ['FacultyRepository'],
    },
    {
      provide: UpdateFacultyUseCase,
      useFactory: (facultyRepository) => new UpdateFacultyUseCase(facultyRepository),
      inject: ['FacultyRepository'],
    },
    {
      provide: DeleteFacultyUseCase,
      useFactory: (facultyRepository) => new DeleteFacultyUseCase(facultyRepository),
      inject: ['FacultyRepository'],
    },
  ],
})
export class FacultyModule {}