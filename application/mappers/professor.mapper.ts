import { Professor } from '../../domain/entities/professor.entity';
import { ProfessorResponseDto } from '../dto/professor/professor-response.dto';

export class ProfessorMapper {
  static toResponseDto(professor: Professor): ProfessorResponseDto {
    return {
      id: professor.id,
      personId: professor.personId,
      hireDate: professor.hireDate,
      createdAt: professor.createdAt,
    } as any;
  }

  static toResponseDtoArray(professors: Professor[]): ProfessorResponseDto[] {
    return professors.map(professor => this.toResponseDto(professor));
  }
}