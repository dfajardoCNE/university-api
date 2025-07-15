import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentRepositoryImpl } from '../../../infrastructure/database/repositories/student/student.repository.impl';
import { GetAllStudentsUseCase } from '../../../domain/use-cases/student/get-all-students.use-case';
import { GetStudentByIdUseCase } from '../../../domain/use-cases/student/get-student-by-id.use-case';
import { GetStudentsByCareerUseCase } from '../../../domain/use-cases/student/get-students-by-career.use-case';
import { CreateStudentUseCase } from '../../../domain/use-cases/student/create-student.use-case';
import { UpdateStudentUseCase } from '../../../domain/use-cases/student/update-student.use-case';
import { DeleteStudentUseCase } from '../../../domain/use-cases/student/delete-student.use-case';

@Module({
  controllers: [StudentController],
  providers: [
    {
      provide: 'StudentRepository',
      useClass: StudentRepositoryImpl,
    },
    {
      provide: GetAllStudentsUseCase,
      useFactory: (studentRepository) => new GetAllStudentsUseCase(studentRepository),
      inject: ['StudentRepository'],
    },
    {
      provide: GetStudentByIdUseCase,
      useFactory: (studentRepository) => new GetStudentByIdUseCase(studentRepository),
      inject: ['StudentRepository'],
    },
    {
      provide: GetStudentsByCareerUseCase,
      useFactory: (studentRepository) => new GetStudentsByCareerUseCase(studentRepository),
      inject: ['StudentRepository'],
    },
    {
      provide: CreateStudentUseCase,
      useFactory: (studentRepository) => new CreateStudentUseCase(studentRepository),
      inject: ['StudentRepository'],
    },
    {
      provide: UpdateStudentUseCase,
      useFactory: (studentRepository) => new UpdateStudentUseCase(studentRepository),
      inject: ['StudentRepository'],
    },
    {
      provide: DeleteStudentUseCase,
      useFactory: (studentRepository) => new DeleteStudentUseCase(studentRepository),
      inject: ['StudentRepository'],
    },
  ],
})
export class StudentModule {}