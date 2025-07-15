import { Classroom } from '../../entities/classroom.entity';
import { ClassroomRepository } from '../../repositories/classroom.repository';

export class GetClassroomsByBuildingUseCase {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute(buildingId: number): Promise<Classroom[]> {
    return this.classroomRepository.findByBuilding(buildingId);
  }
}