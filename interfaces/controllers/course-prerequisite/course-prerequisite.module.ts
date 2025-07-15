import { Module } from '@nestjs/common';
import { CoursePrerequisiteController } from './course-prerequisite.controller';
import { CoursePrerequisiteRepositoryImpl } from '../../../infrastructure/database/repositories/course-prerequisite/course-prerequisite.repository.impl';
import { GetPrerequisitesForCourseUseCase } from '../../../domain/use-cases/course-prerequisite/get-prerequisites-for-course.use-case';
import { GetCoursesByPrerequisiteUseCase } from '../../../domain/use-cases/course-prerequisite/get-courses-by-prerequisite.use-case';
import { CreateCoursePrerequisiteUseCase } from '../../../domain/use-cases/course-prerequisite/create-course-prerequisite.use-case';
import { DeleteCoursePrerequisiteUseCase } from '../../../domain/use-cases/course-prerequisite/delete-course-prerequisite.use-case';

@Module({
  controllers: [CoursePrerequisiteController],
  providers: [
    {
      provide: 'CoursePrerequisiteRepository',
      useClass: CoursePrerequisiteRepositoryImpl,
    },
    {
      provide: GetPrerequisitesForCourseUseCase,
      useFactory: (repo) => new GetPrerequisitesForCourseUseCase(repo),
      inject: ['CoursePrerequisiteRepository'],
    },
    {
      provide: GetCoursesByPrerequisiteUseCase,
      useFactory: (repo) => new GetCoursesByPrerequisiteUseCase(repo),
      inject: ['CoursePrerequisiteRepository'],
    },
    {
      provide: CreateCoursePrerequisiteUseCase,
      useFactory: (repo) => new CreateCoursePrerequisiteUseCase(repo),
      inject: ['CoursePrerequisiteRepository'],
    },
    {
      provide: DeleteCoursePrerequisiteUseCase,
      useFactory: (repo) => new DeleteCoursePrerequisiteUseCase(repo),
      inject: ['CoursePrerequisiteRepository'],
    },
  ],
})
export class CoursePrerequisiteModule {}