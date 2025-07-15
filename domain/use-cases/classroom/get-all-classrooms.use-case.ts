import { Classroom } from '../../entities/classroom.entity';
import { ClassroomRepository } from '../../repositories/classroom.repository';

export class GetAllClassroomsUseCase {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute(): Promise<Classroom[]> {
    return this.classroomRepository.findAll();
  }
}