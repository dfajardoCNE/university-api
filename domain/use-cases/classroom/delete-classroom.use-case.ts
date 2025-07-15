import { ClassroomRepository } from '../../repositories/classroom.repository';

export class DeleteClassroomUseCase {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute(id: number): Promise<void> {
    return this.classroomRepository.delete(id);
  }
}