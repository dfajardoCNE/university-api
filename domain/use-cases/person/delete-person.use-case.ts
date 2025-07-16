import { Injectable, Inject } from '@nestjs/common';
import { PersonRepository } from '../../repositories/person.repository';

@Injectable()
export class DeletePersonUseCase {
  constructor(@Inject('PersonRepository') private readonly personRepository: PersonRepository) {}

  async execute(id: number): Promise<void> {
    return this.personRepository.delete(id);
  }
}