import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { AssignmentRepositoryImpl } from '../../../infrastructure/database/repositories/assignment/assignment.repository.impl';
import { GetAllAssignmentsUseCase } from '../../../domain/use-cases/assignment/get-all-assignments.use-case';
import { GetAssignmentByIdUseCase } from '../../../domain/use-cases/assignment/get-assignment-by-id.use-case';
import { GetAssignmentsByCourseUseCase } from '../../../domain/use-cases/assignment/get-assignments-by-course.use-case';
import { CreateAssignmentUseCase } from '../../../domain/use-cases/assignment/create-assignment.use-case';
import { UpdateAssignmentUseCase } from '../../../domain/use-cases/assignment/update-assignment.use-case';
import { DeleteAssignmentUseCase } from '../../../domain/use-cases/assignment/delete-assignment.use-case';

@Module({
  controllers: [AssignmentController],
  providers: [
    {
      provide: 'AssignmentRepository',
      useClass: AssignmentRepositoryImpl,
    },
    {
      provide: GetAllAssignmentsUseCase,
      useFactory: (repo) => new GetAllAssignmentsUseCase(repo),
      inject: ['AssignmentRepository'],
    },
    {
      provide: GetAssignmentByIdUseCase,
      useFactory: (repo) => new GetAssignmentByIdUseCase(repo),
      inject: ['AssignmentRepository'],
    },
    {
      provide: GetAssignmentsByCourseUseCase,
      useFactory: (repo) => new GetAssignmentsByCourseUseCase(repo),
      inject: ['AssignmentRepository'],
    },
    {
      provide: CreateAssignmentUseCase,
      useFactory: (repo) => new CreateAssignmentUseCase(repo),
      inject: ['AssignmentRepository'],
    },
    {
      provide: UpdateAssignmentUseCase,
      useFactory: (repo) => new UpdateAssignmentUseCase(repo),
      inject: ['AssignmentRepository'],
    },
    {
      provide: DeleteAssignmentUseCase,
      useFactory: (repo) => new DeleteAssignmentUseCase(repo),
      inject: ['AssignmentRepository'],
    },
  ],
})
export class AssignmentModule {}