import { Classroom } from '../../entities/classroom.entity';
import { ClassroomRepository } from '../../repositories/classroom.repository';

export class UpdateClassroomUseCase {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute(id: number, classroom: Partial<Classroom>): Promise<Classroom> {
    return this.classroomRepository.update(id, classroom);
  }
}