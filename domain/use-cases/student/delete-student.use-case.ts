import { StudentRepository } from '../../repositories/student.repository';

export class DeleteStudentUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async execute(id: number): Promise<void> {
    return this.studentRepository.delete(id);
  }
}