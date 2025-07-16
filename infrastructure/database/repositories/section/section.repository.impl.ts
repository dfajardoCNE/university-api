import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Section } from '../../../../domain/entities/section.entity';
import { SectionRepository } from '../../../../domain/repositories/section.repository';

@Injectable()
export class SectionRepositoryImpl implements SectionRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Section[]> {
    const sections = await this.prisma.section.findMany({
      include: {
        course: true,
        professor: {
          include: {
            person: true
          }
        },
        classroom: true,
      },
    });
    
    // Mapear los resultados para incluir la propiedad capacity requerida por la entidad Section
    return sections.map(section => this.mapSectionToEntity(section));
  }
  
  // Método auxiliar para formatear el horario
  private formatSchedule(section: any): string {
    // Implementación básica, debería mejorarse con datos reales
    return 'Horario no disponible';
  }

  // Método auxiliar para mapear la sección a la entidad
  private mapSectionToEntity(section: any): Section {
    return {
      ...section,
      capacity: section.classroom?.capacity || 0,
      // Añadir propiedades adicionales para uso en consultas con joins
      courseName: section.course?.name,
      courseCode: section.course?.code,
      schedule: this.formatSchedule(section),
      enrolledCount: 0, // Esto debería calcularse con una consulta adicional
      room: section.classroom?.name,
      professorName: section.professor?.person ? 
        `${section.professor.person.firstName} ${section.professor.person.lastName}` : 
        'Profesor no asignado',
    };
  }

  async findById(id: number): Promise<Section> {
    const section = await this.prisma.section.findUnique({
      where: { id },
      include: {
        course: true,
        professor: {
          include: {
            person: true
          }
        },
        classroom: true,
      },
    });
    
    if (!section) return null;
    
    return this.mapSectionToEntity(section);
  }

  async findByCourse(courseId: number): Promise<Section[]> {
    const sections = await this.prisma.section.findMany({
      where: { courseId },
      include: {
        course: true,
        professor: {
          include: {
            person: true
          }
        },
        classroom: true,
      },
    });
    
    return sections.map(section => this.mapSectionToEntity(section));
  }

  async findByProfessor(professorId: number): Promise<Section[]> {
    const sections = await this.prisma.section.findMany({
      where: { professorId },
      include: {
        course: true,
        professor: {
          include: {
            person: true
          }
        },
        classroom: true,
      },
    });
    
    return sections.map(section => this.mapSectionToEntity(section));
  }

  async findByTerm(termId: number): Promise<Section[]> {
    const sections = await this.prisma.section.findMany({
      where: { termId },
      include: {
        course: true,
        professor: {
          include: {
            person: true
          }
        },
        classroom: true,
      },
    });
    
    return sections.map(section => this.mapSectionToEntity(section));
  }

  async create(section: Partial<Section>): Promise<Section> {
    const { id, capacity, courseName, courseCode, schedule, enrolledCount, room, professorName, ...data } = section;
    
    const createdSection = await this.prisma.section.create({
      data: data as any,
      include: {
        course: true,
        professor: {
          include: {
            person: true
          }
        },
        classroom: true,
      },
    });
    
    return this.mapSectionToEntity(createdSection);
  }

  async update(id: number, section: Partial<Section>): Promise<Section> {
    const { id: _, capacity, courseName, courseCode, schedule, enrolledCount, room, professorName, ...data } = section;
    
    const updatedSection = await this.prisma.section.update({
      where: { id },
      data: data as any,
      include: {
        course: true,
        professor: {
          include: {
            person: true
          }
        },
        classroom: true,
      },
    });
    
    return this.mapSectionToEntity(updatedSection);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.section.delete({
      where: { id },
    });
  }

  async getActiveTerms(): Promise<any[]> {
    const now = new Date();
    
    // Obtener términos activos (donde la fecha actual está entre startDate y endDate)
    const activeTerms = await this.prisma.term.findMany({
      where: {
        startDate: { lte: now },
        endDate: { gte: now }
      },
      orderBy: {
        startDate: 'desc'
      }
    });
    
    return activeTerms;
  }

  async findLowEnrollment(): Promise<any[]> {
    // Obtener todas las secciones
    const sections = await this.prisma.section.findMany({
      include: {
        course: true,
        classroom: true,
        professor: {
          include: {
            person: true
          }
        }
      }
    });
    
    const result = [];
    
    // Para cada sección, contar estudiantes inscritos
    for (const section of sections) {
      const enrolledCount = await this.prisma.studentSection.count({
        where: { sectionId: section.id }
      });
      
      // Si la capacidad es mayor que el doble de estudiantes inscritos, considerarla de baja inscripción
      // (esto es solo un ejemplo, el criterio puede ajustarse)
      const capacity = section.classroom?.capacity || 30;
      if (enrolledCount < capacity * 0.3) {
        result.push({
          ...section,
          capacity,
          enrolledCount,
          courseName: section.course?.name,
          courseCode: section.course?.code,
          schedule: this.formatSchedule(section),
          room: section.classroom?.name,
          professorName: section.professor?.person ? 
            `${section.professor.person.firstName} ${section.professor.person.lastName}` : 
            'Profesor no asignado',
          enrollmentPercentage: Math.round((enrolledCount / capacity) * 100)
        });
      }
    }
    
    return result;
  }
}