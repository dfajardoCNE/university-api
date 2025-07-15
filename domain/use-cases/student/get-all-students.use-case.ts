import { Student } from '../../entities/student.entity';
import { StudentRepository } from '../../repositories/student.repository';

export class GetAllStudentsUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async execute(): Promise<Student[]> {
    return this.studentRepository.findAll();
  }
}