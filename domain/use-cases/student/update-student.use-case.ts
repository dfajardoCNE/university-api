import { Student } from '../../entities/student.entity';
import { StudentRepository } from '../../repositories/student.repository';

export class UpdateStudentUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async execute(id: number, student: Partial<Student>): Promise<Student> {
    return this.studentRepository.update(id, student);
  }
}