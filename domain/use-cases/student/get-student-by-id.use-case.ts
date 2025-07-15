import { Student } from '../../entities/student.entity';
import { StudentRepository } from '../../repositories/student.repository';

export class GetStudentByIdUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async execute(id: number): Promise<Student> {
    return this.studentRepository.findById(id);
  }
}