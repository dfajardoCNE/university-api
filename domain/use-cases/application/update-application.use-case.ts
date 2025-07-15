import { Application } from '../../entities/application.entity';
import { ApplicationRepository } from '../../repositories/application.repository';

export class UpdateApplicationUseCase {
  constructor(private applicationRepository: ApplicationRepository) {}

  async execute(id: number, application: Partial<Application>): Promise<Application> {
    return this.applicationRepository.update(id, application);
  }
}