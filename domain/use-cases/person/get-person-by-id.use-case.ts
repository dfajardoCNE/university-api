import { Injectable, Inject } from '@nestjs/common';
import { PersonRepository } from '../../repositories/person.repository';
import { Person } from '../../entities/person.entity';

@Injectable()
export class GetPersonByIdUseCase {
  constructor(@Inject('PersonRepository') private readonly personRepository: PersonRepository) {}

  async execute(id: number): Promise<Person> {
    return this.personRepository.findById(id);
  }
}