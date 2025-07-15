import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Person } from '../../../../domain/entities/person.entity';
import { PersonRepository } from '../../../../domain/repositories/person.repository';

@Injectable()
export class PersonRepositoryImpl implements PersonRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Person[]> {
    return this.prisma.person.findMany();
  }

  async findById(id: number): Promise<Person> {
    return this.prisma.person.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Person> {
    return this.prisma.person.findUnique({
      where: { email },
    });
  }

  async create(person: Partial<Person>): Promise<Person> {
    return this.prisma.person.create({
      data: person,
    });
  }

  async update(id: number, person: Partial<Person>): Promise<Person> {
    return this.prisma.person.update({
      where: { id },
      data: person,
    });
  }
}