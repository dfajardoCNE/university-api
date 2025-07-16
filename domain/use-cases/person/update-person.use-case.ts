import { Injectable, Inject } from '@nestjs/common';
import { PersonRepository } from '../../repositories/person.repository';
import { Person } from '../../entities/person.entity';
import { UpdatePersonDto } from '../../../application/dto/person/update-person.dto';

@Injectable()
export class UpdatePersonUseCase {
  constructor(@Inject('PersonRepository') private readonly personRepository: PersonRepository) {}

  async execute(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const person: Partial<Person> = {
      ...updatePersonDto,
      dateOfBirth: updatePersonDto.dateOfBirth ? new Date(updatePersonDto.dateOfBirth) : undefined,
    };

    return this.personRepository.update(id, person);
  }
}