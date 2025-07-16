import { Student } from '../../domain/entities/student.entity';
import { StudentResponseDto } from '../dto/student/student-response.dto';

export class StudentMapper {
  static toResponseDto(student: Student): StudentResponseDto {
    return {
      id: student.id,
      personId: student.personId,
      careerId: student.careerId,
      campusId: student.campusId,
      enrollmentDate: student.enrollmentDate,
      status: student.status,
      createdAt: student.createdAt,
    } as any;
  }

  static toResponseDtoArray(students: Student[]): StudentResponseDto[] {
    return students.map(student => this.toResponseDto(student));
  }
}