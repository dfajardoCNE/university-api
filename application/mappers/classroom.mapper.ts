import { Classroom } from '../../domain/entities/classroom.entity';
import { ClassroomResponseDto } from '../dto/classroom/classroom-response.dto';

export class ClassroomMapper {
  static toResponseDto(classroom: Classroom): ClassroomResponseDto {
    return {
      id: classroom.id,
      name: classroom.name,
      capacity: classroom.capacity,
      campusId: classroom.campusId,
      createdAt: classroom.createdAt,
      updatedAt: classroom.updatedAt,
      deletedAt: classroom.deletedAt,
    };
  }

  static toResponseDtoArray(classrooms: Classroom[]): ClassroomResponseDto[] {
    return classrooms.map(classroom => this.toResponseDto(classroom));
  }
}