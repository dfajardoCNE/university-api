import { Student } from '../../entities/student.entity';
import { StudentRepository } from '../../repositories/student.repository';

export class GetStudentsByCareerUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async execute(careerId: number): Promise<Student[]> {
    return this.studentRepository.findByCareer(careerId);
  }
}