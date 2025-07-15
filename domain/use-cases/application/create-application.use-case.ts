import { Application } from '../../entities/application.entity';
import { ApplicationRepository } from '../../repositories/application.repository';

export class CreateApplicationUseCase {
  constructor(private applicationRepository: ApplicationRepository) {}

  async execute(application: Partial<Application>): Promise<Application> {
    return this.applicationRepository.create(application);
  }
}