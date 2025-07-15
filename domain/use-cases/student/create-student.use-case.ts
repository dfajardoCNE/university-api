import { Student } from '../../entities/student.entity';
import { StudentRepository } from '../../repositories/student.repository';

export class CreateStudentUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async execute(student: Partial<Student>): Promise<Student> {
    return this.studentRepository.create(student);
  }
}