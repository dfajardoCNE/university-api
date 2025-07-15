import { Application } from '../../entities/application.entity';
import { ApplicationRepository } from '../../repositories/application.repository';

export class GetAllApplicationsUseCase {
  constructor(private applicationRepository: ApplicationRepository) {}

  async execute(): Promise<Application[]> {
    return this.applicationRepository.findAll();
  }
}