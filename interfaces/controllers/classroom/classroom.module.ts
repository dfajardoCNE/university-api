import { Module } from '@nestjs/common';
import { ClassroomController } from './classroom.controller';
import { ClassroomRepositoryImpl } from '../../../infrastructure/database/repositories/classroom/classroom.repository.impl';
import { GetAllClassroomsUseCase } from '../../../domain/use-cases/classroom/get-all-classrooms.use-case';
import { GetClassroomByIdUseCase } from '../../../domain/use-cases/classroom/get-classroom-by-id.use-case';
import { GetClassroomsByCampusUseCase } from '../../../domain/use-cases/classroom/get-classrooms-by-campus.use-case';
import { CreateClassroomUseCase } from '../../../domain/use-cases/classroom/create-classroom.use-case';
import { UpdateClassroomUseCase } from '../../../domain/use-cases/classroom/update-classroom.use-case';
import { DeleteClassroomUseCase } from '../../../domain/use-cases/classroom/delete-classroom.use-case';

@Module({
  controllers: [ClassroomController],
  providers: [
    {
      provide: 'ClassroomRepository',
      useClass: ClassroomRepositoryImpl,
    },
    {
      provide: GetAllClassroomsUseCase,
      useFactory: (classroomRepository) => new GetAllClassroomsUseCase(classroomRepository),
      inject: ['ClassroomRepository'],
    },
    {
      provide: GetClassroomByIdUseCase,
      useFactory: (classroomRepository) => new GetClassroomByIdUseCase(classroomRepository),
      inject: ['ClassroomRepository'],
    },
    {
      provide: GetClassroomsByCampusUseCase,
      useFactory: (classroomRepository) => new GetClassroomsByCampusUseCase(classroomRepository),
      inject: ['ClassroomRepository'],
    },
    {
      provide: CreateClassroomUseCase,
      useFactory: (classroomRepository) => new CreateClassroomUseCase(classroomRepository),
      inject: ['ClassroomRepository'],
    },
    {
      provide: UpdateClassroomUseCase,
      useFactory: (classroomRepository) => new UpdateClassroomUseCase(classroomRepository),
      inject: ['ClassroomRepository'],
    },
    {
      provide: DeleteClassroomUseCase,
      useFactory: (classroomRepository) => new DeleteClassroomUseCase(classroomRepository),
      inject: ['ClassroomRepository'],
    },
  ],
})
export class ClassroomModule {}