import { Classroom } from '../../entities/classroom.entity';
import { ClassroomRepository } from '../../repositories/classroom.repository';

export class CreateClassroomUseCase {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute(classroom: Partial<Classroom>): Promise<Classroom> {
    return this.classroomRepository.create(classroom);
  }
}