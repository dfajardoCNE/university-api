import { Injectable, Inject } from '@nestjs/common';
import { PersonRepository } from '../../repositories/person.repository';
import { Person } from '../../entities/person.entity';
import { CreatePersonDto } from '../../../application/dto/person/create-person.dto';

@Injectable()
export class CreatePersonUseCase {
  constructor(@Inject('PersonRepository') private readonly personRepository: PersonRepository) {}

  async execute(createPersonDto: CreatePersonDto): Promise<Person> {
    const person: Partial<Person> = {
      firstName: createPersonDto.firstName,
      lastName: createPersonDto.lastName,
      email: createPersonDto.email,
      dateOfBirth: createPersonDto.dateOfBirth ? new Date(createPersonDto.dateOfBirth) : undefined,
      profilePhotoPath: createPersonDto.profilePhotoPath,
      createdAt: new Date(),
    };

    return this.personRepository.create(person);
  }
}