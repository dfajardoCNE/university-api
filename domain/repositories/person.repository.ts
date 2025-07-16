import { Person } from '../entities/person.entity';

export interface PersonRepository {
  findAll(): Promise<Person[]>;
  findById(id: number): Promise<Person>;
  findByEmail(email: string): Promise<Person>;
  create(person: Partial<Person>): Promise<Person>;
  update(id: number, person: Partial<Person>): Promise<Person>;
  delete(id: number): Promise<void>;
}