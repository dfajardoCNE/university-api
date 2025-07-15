import { Module } from '@nestjs/common';
import { TeacherRatingController } from './teacher-rating.controller';
import { TeacherRatingRepositoryImpl } from '../../../infrastructure/database/repositories/teacher-rating/teacher-rating.repository.impl';
import { GetRatingsByProfessorUseCase } from '../../../domain/use-cases/teacher-rating/get-ratings-by-professor.use-case';
import { GetRatingsByStudentUseCase } from '../../../domain/use-cases/teacher-rating/get-ratings-by-student.use-case';
import { CreateRatingUseCase } from '../../../domain/use-cases/teacher-rating/create-rating.use-case';
import { UpdateRatingUseCase } from '../../../domain/use-cases/teacher-rating/update-rating.use-case';
import { DeleteRatingUseCase } from '../../../domain/use-cases/teacher-rating/delete-rating.use-case';

@Module({
  controllers: [TeacherRatingController],
  providers: [
    {
      provide: 'TeacherRatingRepository',
      useClass: TeacherRatingRepositoryImpl,
    },
    {
      provide: GetRatingsByProfessorUseCase,
      useFactory: (repo) => new GetRatingsByProfessorUseCase(repo),
      inject: ['TeacherRatingRepository'],
    },
    {
      provide: GetRatingsByStudentUseCase,
      useFactory: (repo) => new GetRatingsByStudentUseCase(repo),
      inject: ['TeacherRatingRepository'],
    },
    {
      provide: CreateRatingUseCase,
      useFactory: (repo) => new CreateRatingUseCase(repo),
      inject: ['TeacherRatingRepository'],
    },
    {
      provide: UpdateRatingUseCase,
      useFactory: (repo) => new UpdateRatingUseCase(repo),
      inject: ['TeacherRatingRepository'],
    },
    {
      provide: DeleteRatingUseCase,
      useFactory: (repo) => new DeleteRatingUseCase(repo),
      inject: ['TeacherRatingRepository'],
    },
  ],
})
export class TeacherRatingModule {}