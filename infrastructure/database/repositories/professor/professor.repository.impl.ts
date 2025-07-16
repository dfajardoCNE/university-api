import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Professor } from '../../../../domain/entities/professor.entity';
import { ProfessorRepository } from '../../../../domain/repositories/professor.repository';

@Injectable()
export class ProfessorRepositoryImpl implements ProfessorRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Professor[]> {
    const professors = await this.prisma.professor.findMany({
      include: {
        person: true,
      },
    });
    
    return professors.map(professor => this.mapProfessorToEntity(professor));
  }

  async findById(id: number): Promise<Professor> {
    const professor = await this.prisma.professor.findUnique({
      where: { id },
      include: {
        person: true,
      },
    });
    
    if (!professor) return null;
    
    return this.mapProfessorToEntity(professor);
  }

  async findByPerson(personId: number): Promise<Professor> {
    const professor = await this.prisma.professor.findUnique({
      where: { personId },
      include: {
        person: true,
      },
    });
    
    if (!professor) return null;
    
    return this.mapProfessorToEntity(professor);
  }

  async create(professor: Partial<Professor>): Promise<Professor> {
    const { id, firstName, lastName, email, departmentName, ...data } = professor;
    
    const createdProfessor = await this.prisma.professor.create({
      data: data as any,
      include: {
        person: true,
      },
    });
    
    return this.mapProfessorToEntity(createdProfessor);
  }

  async update(id: number, professor: Partial<Professor>): Promise<Professor> {
    const { id: _, firstName, lastName, email, departmentName, ...data } = professor;
    
    const updatedProfessor = await this.prisma.professor.update({
      where: { id },
      data: data as any,
      include: {
        person: true,
      },
    });
    
    return this.mapProfessorToEntity(updatedProfessor);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.professor.delete({
      where: { id },
    });
  }

  async count(): Promise<number> {
    return this.prisma.professor.count();
  }
  
  // Método auxiliar para mapear el profesor a la entidad
  private mapProfessorToEntity(professor: any): Professor {
    return {
      ...professor,
      firstName: professor.person?.firstName,
      lastName: professor.person?.lastName,
      email: professor.person?.email,
      departmentName: 'No asignado', // Esto debería venir de una relación con departamento
    };
  }
}