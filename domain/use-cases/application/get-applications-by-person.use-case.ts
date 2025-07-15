import { Application } from '../../entities/application.entity';
import { ApplicationRepository } from '../../repositories/application.repository';

export class GetApplicationsByPersonUseCase {
  constructor(private applicationRepository: ApplicationRepository) {}

  async execute(personId: number): Promise<Application[]> {
    return this.applicationRepository.findByPerson(personId);
  }
}