import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentRepositoryImpl } from '../../../infrastructure/database/repositories/department/department.repository.impl';
import { GetAllDepartmentsUseCase } from '../../../domain/use-cases/department/get-all-departments.use-case';
import { GetDepartmentByIdUseCase } from '../../../domain/use-cases/department/get-department-by-id.use-case';
import { GetDepartmentsByFacultyUseCase } from '../../../domain/use-cases/department/get-departments-by-faculty.use-case';
import { CreateDepartmentUseCase } from '../../../domain/use-cases/department/create-department.use-case';
import { UpdateDepartmentUseCase } from '../../../domain/use-cases/department/update-department.use-case';
import { DeleteDepartmentUseCase } from '../../../domain/use-cases/department/delete-department.use-case';

@Module({
  controllers: [DepartmentController],
  providers: [
    {
      provide: 'DepartmentRepository',
      useClass: DepartmentRepositoryImpl,
    },
    {
      provide: GetAllDepartmentsUseCase,
      useFactory: (departmentRepository) => new GetAllDepartmentsUseCase(departmentRepository),
      inject: ['DepartmentRepository'],
    },
    {
      provide: GetDepartmentByIdUseCase,
      useFactory: (departmentRepository) => new GetDepartmentByIdUseCase(departmentRepository),
      inject: ['DepartmentRepository'],
    },
    {
      provide: GetDepartmentsByFacultyUseCase,
      useFactory: (departmentRepository) => new GetDepartmentsByFacultyUseCase(departmentRepository),
      inject: ['DepartmentRepository'],
    },
    {
      provide: CreateDepartmentUseCase,
      useFactory: (departmentRepository) => new CreateDepartmentUseCase(departmentRepository),
      inject: ['DepartmentRepository'],
    },
    {
      provide: UpdateDepartmentUseCase,
      useFactory: (departmentRepository) => new UpdateDepartmentUseCase(departmentRepository),
      inject: ['DepartmentRepository'],
    },
    {
      provide: DeleteDepartmentUseCase,
      useFactory: (departmentRepository) => new DeleteDepartmentUseCase(departmentRepository),
      inject: ['DepartmentRepository'],
    },
  ],
})
export class DepartmentModule {}