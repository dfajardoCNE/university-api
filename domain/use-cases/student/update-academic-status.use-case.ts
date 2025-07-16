import { Injectable, Inject } from '@nestjs/common';
import { StudentRepository } from '../../repositories/student.repository';
import { CalculateStudentGpaUseCase } from './calculate-student-gpa.use-case';

@Injectable()
export class UpdateAcademicStatusUseCase {
  constructor(
    @Inject('StudentRepository') 
    private readonly studentRepository: StudentRepository,
    private readonly calculateStudentGpaUseCase: CalculateStudentGpaUseCase,
  ) {}

  async execute(studentId: number): Promise<{ 
    academicStatus: string; 
    gpa: number;
    message?: string;
  }> {
    // Calcular el GPA actual del estudiante
    const gpaResult = await this.calculateStudentGpaUseCase.execute(studentId);
    
    // Determinar el estado académico basado en el GPA y otros factores
    let academicStatus = 'good_standing';
    let message = 'Estatus académico normal.';
    
    // Reglas para determinar el estado académico
    if (gpaResult.gpa < 2.0) {
      if (gpaResult.completedCourses >= 4) {
        academicStatus = 'academic_probation';
        message = 'Estudiante en período de prueba académica debido a bajo rendimiento.';
      } else {
        academicStatus = 'warning';
        message = 'Advertencia: Rendimiento académico por debajo del mínimo requerido.';
      }
    } else if (gpaResult.gpa < 2.5) {
      academicStatus = 'warning';
      message = 'Advertencia: Rendimiento académico cercano al mínimo requerido.';
    } else if (gpaResult.gpa >= 3.5) {
      academicStatus = 'honors';
      message = 'Estudiante con rendimiento académico destacado.';
    }
    
    // Actualizar el estado académico en la base de datos
    await this.studentRepository.updateAcademicStatus(studentId, academicStatus, gpaResult.gpa);
    
    return {
      academicStatus,
      gpa: gpaResult.gpa,
      message
    };
  }
}