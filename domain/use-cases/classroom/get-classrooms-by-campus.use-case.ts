import { Classroom } from '../../entities/classroom.entity';
import { ClassroomRepository } from '../../repositories/classroom.repository';

export class GetClassroomsByCampusUseCase {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute(campusId: number): Promise<Classroom[]> {
    return this.classroomRepository.findByCampus(campusId);
  }
}