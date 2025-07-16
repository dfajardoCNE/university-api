import { Injectable, Inject } from '@nestjs/common';
import { PersonRepository } from '../../repositories/person.repository';
import { Person } from '../../entities/person.entity';

@Injectable()
export class GetAllPersonsUseCase {
  constructor(@Inject('PersonRepository') private readonly personRepository: PersonRepository) {}

  async execute(): Promise<Person[]> {
    return this.personRepository.findAll();
  }
}