import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseRepositoryImpl } from '../../../infrastructure/database/repositories/course/course.repository.impl';
import { GetAllCoursesUseCase } from '../../../domain/use-cases/course/get-all-courses.use-case';
import { GetCourseByIdUseCase } from '../../../domain/use-cases/course/get-course-by-id.use-case';
import { GetCoursesByCareerUseCase } from '../../../domain/use-cases/course/get-courses-by-career.use-case';
import { CreateCourseUseCase } from '../../../domain/use-cases/course/create-course.use-case';
import { UpdateCourseUseCase } from '../../../domain/use-cases/course/update-course.use-case';
import { DeleteCourseUseCase } from '../../../domain/use-cases/course/delete-course.use-case';

@Module({
  controllers: [CourseController],
  providers: [
    {
      provide: 'CourseRepository',
      useClass: CourseRepositoryImpl,
    },
    {
      provide: GetAllCoursesUseCase,
      useFactory: (courseRepository) => new GetAllCoursesUseCase(courseRepository),
      inject: ['CourseRepository'],
    },
    {
      provide: GetCourseByIdUseCase,
      useFactory: (courseRepository) => new GetCourseByIdUseCase(courseRepository),
      inject: ['CourseRepository'],
    },
    {
      provide: GetCoursesByCareerUseCase,
      useFactory: (courseRepository) => new GetCoursesByCareerUseCase(courseRepository),
      inject: ['CourseRepository'],
    },
    {
      provide: CreateCourseUseCase,
      useFactory: (courseRepository) => new CreateCourseUseCase(courseRepository),
      inject: ['CourseRepository'],
    },
    {
      provide: UpdateCourseUseCase,
      useFactory: (courseRepository) => new UpdateCourseUseCase(courseRepository),
      inject: ['CourseRepository'],
    },
    {
      provide: DeleteCourseUseCase,
      useFactory: (courseRepository) => new DeleteCourseUseCase(courseRepository),
      inject: ['CourseRepository'],
    },
  ],
})
export class CourseModule {}