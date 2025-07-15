import { Classroom } from '../../entities/classroom.entity';
import { ClassroomRepository } from '../../repositories/classroom.repository';

export class GetClassroomByIdUseCase {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute(id: number): Promise<Classroom> {
    return this.classroomRepository.findById(id);
  }
}